/**
 * Nebula Brewery — Core Game Engine
 * Handles the game loop, production calculations, purchases, and all core mechanics.
 */

import { state, setState, getState } from './state.js';
import { BUILDINGS, BUILDING_ORDER, getBuilding, getBuildingFlavorText } from './data/buildings.js';
import { CLICK_UPGRADES, BUILDING_UPGRADES, GLOBAL_UPGRADES, SPACE_TECH_UPGRADES, getAllUpgrades, getUpgrade } from './data/upgrades.js';
import { SPACECRAFT, getSpacecraft } from './data/spacecraft.js';
import { ZONES, getZone } from './data/zones.js';
import { ACHIEVEMENTS } from './data/achievements.js';
import { MILESTONE_NEWS } from './data/news.js';
import { getUnlockedPatrons, getPatron } from './data/patrons.js';

let lastTick = Date.now();
let tickInterval = null;
let uiCallback = null;

// --- Game Loop ---

export function startGameLoop(onUpdate) {
    uiCallback = onUpdate;
    lastTick = Date.now();

    // Calculation tick every 100ms
    tickInterval = setInterval(() => {
        const now = Date.now();
        const dt = (now - lastTick) / 1000; // seconds since last tick
        lastTick = now;

        // Accumulate playtime
        state.totalPlaytime += dt;

        // Add production from buildings
        const production = calculateProductionPerSecond();
        const earned = production * dt;
        if (earned > 0) {
            state.stardust += earned;
            state.totalEarned += earned;
        }

        // Auto-click from Star Cursors
        const cursorCount = state.buildings.starCursor || 0;
        if (cursorCount > 0) {
            let cursorRate = 0.1; // base clicks/sec per cursor
            for (const tech of SPACE_TECH_UPGRADES) {
                if (tech.effect.type === 'passiveClick' && state.upgrades.includes(tech.id)) {
                    cursorRate *= (1 + tech.effect.value);
                }
            }
            const clicksPerSecond = cursorCount * cursorRate;
            const autoClickValue = getClickValue() * clicksPerSecond * dt;
            if (autoClickValue > 0) {
                state.stardust += autoClickValue;
                state.totalEarned += autoClickValue;
            }
        }

        // Check unlocks
        checkMilestoneNews();
        checkAchievements();
        checkPatrons();
        checkZoneDiscoveries();
    }, 100);

    // UI update via requestAnimationFrame
    function renderLoop() {
        if (uiCallback) uiCallback(state);
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
}

export function stopGameLoop() {
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = null;
}

// --- Production Calculations ---

export function calculateProductionPerSecond() {
    const s = state;
    let totalProduction = 0;

    for (const building of BUILDINGS) {
        const count = s.buildings[building.id] || 0;
        if (count === 0) continue;

        let buildingRate = building.baseProduction * count;

        // Apply building-specific upgrades
        for (const upgrade of BUILDING_UPGRADES) {
            if (upgrade.buildingId === building.id && s.upgrades.includes(upgrade.id)) {
                buildingRate *= upgrade.multiplier;
            }
        }

        // Apply space tech building-specific multipliers
        for (const tech of SPACE_TECH_UPGRADES) {
            if (tech.effect.type === 'buildingMultiplier' && tech.effect.buildingId === building.id && s.upgrades.includes(tech.id)) {
                buildingRate *= tech.effect.value;
            }
        }

        totalProduction += buildingRate;
    }

    // Apply global production upgrades (additive within category)
    let globalMultiplier = 1.0;
    for (const upgrade of GLOBAL_UPGRADES) {
        if (s.upgrades.includes(upgrade.id)) {
            globalMultiplier += (upgrade.effect.value - 1);
        }
    }
    totalProduction *= globalMultiplier;

    // Apply space tech passive bonuses + collect allZoneBonus boost
    let spaceTechMultiplier = 1.0;
    let zoneBonusBoost = 1.0; // Applied to each zone's contribution
    for (const tech of SPACE_TECH_UPGRADES) {
        if (!s.upgrades.includes(tech.id)) continue;
        if (tech.effect.type === 'passiveProduction') {
            spaceTechMultiplier += (tech.effect.value - 1);
        } else if (tech.effect.type === 'allZoneBonus') {
            zoneBonusBoost *= tech.effect.value;
        }
    }
    totalProduction *= spaceTechMultiplier;

    // Apply zone ingredient bonuses (additive within category)
    let zoneMultiplier = 1.0;
    for (const zone of ZONES) {
        if (s.zones[zone.id]?.visited && zone.ingredient.effect === 'allProduction') {
            zoneMultiplier += ((zone.ingredient.value - 1) * zoneBonusBoost);
        }
    }
    totalProduction *= zoneMultiplier;

    // Apply achievement bonuses
    for (const ach of ACHIEVEMENTS) {
        if (s.achievements.includes(ach.id) && ach.bonus?.type === 'allProduction') {
            totalProduction *= (1 + ach.bonus.value);
        }
    }

    // Apply Cosmic Memory prestige multiplier
    if (s.cosmicMemory > 0) {
        totalProduction *= (1 + s.cosmicMemory * 0.10);
    }

    // Apply Patron Global Buffs
    if (s.patronBuffs) {
        for (const buff of s.patronBuffs) {
            if (buff.type === 'globalProduction') {
                totalProduction *= (1 + buff.value);
            }
        }
    }

    return totalProduction;
}

// --- Click Handling ---

export function getClickValue() {
    const s = state;
    let value = 1; // base

    // Find highest purchased click upgrade
    for (const upgrade of CLICK_UPGRADES) {
        if (s.upgrades.includes(upgrade.id)) {
            value = upgrade.clickValue;
        }
    }

    // Apply click achievement bonuses
    for (const ach of ACHIEVEMENTS) {
        if (s.achievements.includes(ach.id) && ach.bonus?.type === 'clickValue') {
            value *= (1 + ach.bonus.value);
        }
    }

    // Apply zone clickValue bonuses
    for (const zone of ZONES) {
        if (s.zones[zone.id]?.visited && zone.ingredient.effect === 'clickValue') {
            value *= zone.ingredient.value;
        }
    }

    // Apply Cosmic Memory
    if (s.cosmicMemory > 0) {
        value *= (1 + s.cosmicMemory * 0.10);
    }

    // Apply Patron Click Buffs
    if (s.patronBuffs) {
        for (const buff of s.patronBuffs) {
            if (buff.type === 'clickValue') {
                value *= (1 + buff.value);
            }
        }
    }

    return value;
}

export function handleClick() {
    const value = getClickValue();
    state.stardust += value;
    state.totalEarned += value;
    state.totalClicks += 1;
    return value;
}

// --- Building Purchases ---

const GROWTH_RATE = 1.15;

export function getBuildingCost(buildingId, currentCount) {
    const building = getBuilding(buildingId);
    if (!building) return Infinity;
    return Math.floor(building.baseCost * Math.pow(GROWTH_RATE, currentCount));
}

/**
 * Calculate total cost to buy N buildings using geometric series:
 * Total = baseCost * r^currentCount * (r^N - 1) / (r - 1)
 */
export function getBulkBuyCost(buildingId, currentCount, quantity) {
    const building = getBuilding(buildingId);
    if (!building) return Infinity;
    if (quantity <= 0) return 0;

    const B = building.baseCost;
    const r = GROWTH_RATE;
    const c = currentCount;

    // Sum of geometric series: B*r^c + B*r^(c+1) + ... + B*r^(c+N-1)
    const total = B * Math.pow(r, c) * (Math.pow(r, quantity) - 1) / (r - 1);
    return Math.floor(total);
}

/**
 * Find the maximum number of buildings affordable with current stardust.
 */
export function getMaxAffordable(buildingId) {
    const building = getBuilding(buildingId);
    if (!building) return 0;
    const count = state.buildings[buildingId] || 0;
    const budget = state.stardust;

    if (budget < getBuildingCost(buildingId, count)) return 0;

    // Binary search for max N where getBulkBuyCost(id, count, N) <= budget
    let lo = 1, hi = 10000, best = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (getBulkBuyCost(buildingId, count, mid) <= budget) {
            best = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return best;
}

export function canAffordBuilding(buildingId, quantity = 1) {
    const count = state.buildings[buildingId] || 0;
    return state.stardust >= getBulkBuyCost(buildingId, count, quantity);
}

export function purchaseBuilding(buildingId, quantity = 1) {
    const count = state.buildings[buildingId] || 0;
    const cost = getBulkBuyCost(buildingId, count, quantity);

    if (state.stardust < cost) return false;

    state.stardust -= cost;
    state.buildings[buildingId] = count + quantity;
    state.stats.totalBuildingsPurchased += quantity;

    return true;
}

/**
 * Sell one building at 50% of its original purchase cost.
 * Always sells one at a time to prevent accidents.
 */
export function getSellPrice(buildingId) {
    const count = state.buildings[buildingId] || 0;
    if (count <= 0) return 0;
    // Sell price = 50% of what the LAST building cost
    const lastBuildingCost = getBuildingCost(buildingId, count - 1);
    return Math.floor(lastBuildingCost * 0.5);
}

export function sellBuilding(buildingId) {
    const count = state.buildings[buildingId] || 0;
    if (count <= 0) return false;

    const sellPrice = getSellPrice(buildingId);
    state.stardust += sellPrice;
    state.buildings[buildingId] = count - 1;

    return sellPrice;
}

// --- Upgrade Purchases ---

export function getUpgradeCostDiscount() {
    let discount = 1.0;
    if (state.zones.trappist1c?.visited) {
        discount *= 0.97;
    }
    return discount;
}

export function canAffordUpgrade(upgradeId) {
    const upgrade = getUpgrade(upgradeId);
    if (!upgrade) return false;
    if (state.upgrades.includes(upgradeId)) return false;
    const cost = Math.floor(upgrade.cost * getUpgradeCostDiscount());
    return state.stardust >= cost;
}

export function isUpgradeUnlocked(upgradeId) {
    const upgrade = getUpgrade(upgradeId);
    if (!upgrade) return false;
    if (state.upgrades.includes(upgradeId)) return false;

    // Check unlock condition
    if (upgrade.unlockCondition && !upgrade.unlockCondition(state)) return false;

    // For building upgrades, check the required building count
    if (upgrade.buildingId) {
        const count = state.buildings[upgrade.buildingId] || 0;
        if (count < upgrade.requiredCount) return false;
    }

    return true;
}

export function purchaseUpgrade(upgradeId) {
    const upgrade = getUpgrade(upgradeId);
    if (!upgrade) return false;
    if (state.upgrades.includes(upgradeId)) return false;
    const cost = Math.floor(upgrade.cost * getUpgradeCostDiscount());
    if (state.stardust < cost) return false;

    state.stardust -= cost;
    state.upgrades.push(upgradeId);

    return true;
}

// --- Spacecraft Purchases ---

export function getSpacecraftCostDiscount() {
    let discount = 1.0;
    if (state.upgrades.includes('tech_gravityAssist')) {
        discount *= 0.60;
    }
    if (state.zones.trappist1g?.visited) {
        discount *= 0.80;
    }
    return discount;
}

export function canAffordSpacecraft(spacecraftId) {
    const craft = getSpacecraft(spacecraftId);
    if (!craft) return false;
    if (state.spacecraft.includes(spacecraftId)) return false;

    const cost = Math.floor(craft.cost * getSpacecraftCostDiscount());
    return state.stardust >= cost;
}

export function purchaseSpacecraft(spacecraftId) {
    const craft = getSpacecraft(spacecraftId);
    if (!craft) return false;
    if (state.spacecraft.includes(spacecraftId)) return false;

    const cost = Math.floor(craft.cost * getSpacecraftCostDiscount());

    if (state.stardust < cost) return false;

    state.stardust -= cost;
    state.spacecraft.push(spacecraftId);

    // Unlock associated zones
    for (const zoneId of craft.zones) {
        if (!state.zones[zoneId]) {
            state.zones[zoneId] = { unlocked: true, visited: false, factsRead: [] };
        } else {
            state.zones[zoneId].unlocked = true;
        }
    }

    return true;
}

// --- Zone Exploration ---

export function visitZone(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return false;
    if (!state.zones[zoneId]?.unlocked) return false;
    if (state.zones[zoneId]?.visited) return false;

    state.zones[zoneId].visited = true;
    state.stats.zonesVisited += 1;

    return true;
}

export function checkZoneDiscoveries() {
    for (const zone of ZONES) {
        if (!state.zones[zone.id]) {
            if (zone.unlockCondition && zone.unlockCondition(state)) {
                state.zones[zone.id] = { unlocked: true, visited: false, factsRead: [] };
            }
        } else if (!state.zones[zone.id].unlocked) {
            if (zone.unlockCondition && zone.unlockCondition(state)) {
                state.zones[zone.id].unlocked = true;
            }
        }
    }
}

// --- Building Unlock Check ---

export function getUnlockedBuildings() {
    const unlocked = [];
    for (let i = 0; i < BUILDING_ORDER.length; i++) {
        if (i === 0) {
            unlocked.push({ id: BUILDING_ORDER[i], status: 'unlocked' });
        } else {
            const prevId = BUILDING_ORDER[i - 1];
            if ((state.buildings[prevId] || 0) >= 1) {
                unlocked.push({ id: BUILDING_ORDER[i], status: 'unlocked' });
            } else {
                unlocked.push({ id: BUILDING_ORDER[i], status: 'silhouette' });
                break;
            }
        }
    }
    return unlocked;
}

// --- Prestige ---

export function getPrestigeThreshold() {
    const base = 500000000; // 500M
    const scaling = Math.pow(1.5, state.prestigeCount);
    return Math.floor(base * scaling);
}

export function getPrestigeReward() {
    // Earn 1 Cosmic Memory per prestige + bonus for excess stardust
    return 1 + Math.floor(state.totalEarned / getPrestigeThreshold());
}

export function canPrestige() {
    return state.totalEarned >= getPrestigeThreshold();
}

export function getPrestigeProgress() {
    return Math.min(state.totalEarned / getPrestigeThreshold(), 1);
}

export function performPrestige() {
    if (!canPrestige()) return false;

    const reward = getPrestigeReward();

    // Preserve
    const cosmicMemory = state.cosmicMemory + reward;
    const prestigeCount = state.prestigeCount + 1;
    const achievements = [...state.achievements];
    const totalPlaytime = state.totalPlaytime;
    const settings = { ...state.settings };
    const secretFlags = { ...state.secretFlags };
    const newsHistory = [...state.newsHistory];
    const patronBuffs = state.patronBuffs ? [...state.patronBuffs] : [];
    const patronVisits = state.stats.patronVisits ? { ...state.stats.patronVisits } : {};

    // Reset buildings, upgrades, stardust, spacecraft, zones
    state.stardust = 0;
    state.totalEarned = 0;
    state.totalClicks = 0;
    state.buildings = {
        starCursor: 0, observatory: 0, cosmicDistillery: 0, nebulaFarm: 0, pulsarEngine: 0,
        blackHoleTap: 0, wormholePipeline: 0, dysonSwarm: 0, galacticBrewery: 0,
        darkMatterSiphon: 0, multiverseTap: 0,
    };
    state.upgrades = [];
    state.spacecraft = [];
    state.zones = {};

    // Restore persistent data
    state.cosmicMemory = cosmicMemory;
    state.prestigeCount = prestigeCount;
    state.achievements = achievements;
    state.totalPlaytime = totalPlaytime;
    state.settings = settings;
    state.secretFlags = secretFlags;
    state.newsHistory = newsHistory;
    state.patronBuffs = patronBuffs;
    state.activePatron = null;
    state.lastPatronVisit = Date.now();
    state.stats = { totalBuildingsPurchased: 0, zonesVisited: 0, factsRead: 0, patronVisits };
    state.sessionStart = Date.now();
    state.lastSaved = Date.now();

    return { cosmicMemory, prestigeCount, reward };
}

// --- Achievement Checking ---

const newlyEarned = [];

export function checkAchievements() {
    for (const ach of ACHIEVEMENTS) {
        if (state.achievements.includes(ach.id)) continue;
        try {
            if (ach.condition(state)) {
                state.achievements.push(ach.id);
                newlyEarned.push(ach);
            }
        } catch (e) {
            // Condition may reference undefined state paths
        }
    }
}

export function popNewAchievements() {
    return newlyEarned.splice(0, newlyEarned.length);
}

// --- Milestone News Checking ---

const pendingNews = [];

function checkMilestoneNews() {
    const s = state;
    const triggers = {
        firstClick: s.totalClicks >= 1,
        stardust10: s.totalEarned >= 10,
        firstObservatory: s.buildings.observatory >= 1,
        stardust100: s.totalEarned >= 100,
        firstDistillery: s.buildings.cosmicDistillery >= 1,
        stardust1000: s.totalEarned >= 1000,
        firstNebulaFarm: s.buildings.nebulaFarm >= 1,
        stardust10000: s.totalEarned >= 10000,
        tenOfAny: Object.values(s.buildings).some(c => c >= 10),
        stardust100000: s.totalEarned >= 100000,
        firstSpacecraft: s.spacecraft.length >= 1,
        moonZone: s.zones.moon?.visited,
        stardust1000000: s.totalEarned >= 1000000,
        firstPrestige: s.prestigeCount >= 1,
        fivePrestige: s.prestigeCount >= 5,
    };

    for (const news of MILESTONE_NEWS) {
        if (s.newsHistory.includes(news.trigger)) continue;
        if (triggers[news.trigger]) {
            s.newsHistory.push(news.trigger);
            pendingNews.push(news.text);
        }
    }
}

export function popPendingNews() {
    return pendingNews.splice(0, pendingNews.length);
}

// --- Patron System ---

export function checkPatrons() {
    // If a patron is already here, they stay for 3 minutes (180,000ms)
    if (state.activePatron) {
        if (Date.now() - state.activePatron.arrivalTime > 180000) {
            departPatron();
        }
        return;
    }

    // Cooldown between patron visits: 5 minutes (300,000ms)
    if (Date.now() - state.lastPatronVisit < 300000) return;

    // Small chance every 100ms tick to spawn one if they're available
    if (Math.random() < 0.005) {
        const available = getUnlockedPatrons(state);
        // Ensure they aren't the exact same one that just left? (Nah)
        if (available.length > 0) {
            const chosen = available[Math.floor(Math.random() * available.length)];
            spawnPatron(chosen.id);
        }
    }
}

export function spawnPatron(id) {
    state.activePatron = {
        id: id,
        arrivalTime: Date.now(),
        dialogueTriggered: false
    };
    state.lastPatronVisit = Date.now();

    if (!state.stats.patronVisits) state.stats.patronVisits = {};
    state.stats.patronVisits[id] = (state.stats.patronVisits[id] || 0) + 1;
}

export function departPatron() {
    if (!state.activePatron) return;
    const patron = getPatron(state.activePatron.id);
    if (patron) {
        // Apply tip!
        if (patron.tipType === 'stardust' && patron.tipMultiplier) {
            const tipVal = getClickValue() * patron.tipMultiplier;
            state.stardust += tipVal;
            state.totalEarned += tipVal;
            pendingNews.push(`Patron '${patron.name}' has left the bar. Left a tip of ${tipVal.toLocaleString()} stardust.`);
        } else if (patron.tipType === 'buff' && patron.buffData) {
            if (!state.patronBuffs) state.patronBuffs = [];
            // Cap at 5 permanent buffs per patron type to avoid infinite scaling
            const count = state.patronBuffs.filter(b => b.sourceId === patron.id).length;
            if (count < 5) {
                state.patronBuffs.push({ ...patron.buffData, sourceId: patron.id });
                pendingNews.push(`Patron '${patron.name}' left. A strange lasting effect remains.`);
            } else {
                pendingNews.push(`Patron '${patron.name}' left. They seem satisfied with their work.`);
            }
        }
    }
    state.activePatron = null;
    state.lastPatronVisit = Date.now();
}
