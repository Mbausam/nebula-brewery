/**
 * Nebula Brewery — UI Controller
 * Manages all DOM updates, event binding, and UI interactions.
 */

import { formatNumber, formatRate, formatExact } from './format.js';
import { BUILDINGS, BUILDING_ORDER, getBuilding, getBuildingFlavorText } from './data/buildings.js';
import { CLICK_UPGRADES, BUILDING_UPGRADES, GLOBAL_UPGRADES, SPACE_TECH_UPGRADES, getAllUpgrades } from './data/upgrades.js';
import { SPACECRAFT } from './data/spacecraft.js';
import { ZONES, getZone, getZonesSorted } from './data/zones.js';
import { ACHIEVEMENTS } from './data/achievements.js';
import { GENERAL_NEWS, PATRON_NEWS, PRESTIGE_NEWS, ZONE_DISPATCHES } from './data/news.js';
import { getUnlockedPatrons, getPatron } from './data/patrons.js';
import {
    handleClick, getClickValue, calculateProductionPerSecond,
    getBuildingCost, getBulkBuyCost, getMaxAffordable,
    canAffordBuilding, purchaseBuilding, sellBuilding, getSellPrice,
    canAffordUpgrade, isUpgradeUnlocked, purchaseUpgrade, getUpgradeCostDiscount,
    getSpacecraftCostDiscount,
    canAffordSpacecraft, purchaseSpacecraft,
    getUnlockedBuildings, visitZone,
    canPrestige, getPrestigeProgress, getPrestigeReward, getPrestigeThreshold, performPrestige,
    popNewAchievements, popPendingNews,
} from './engine.js';
import { initParticles, spawnClickParticles, spawnFloatingText, spawnMilestoneParticles } from './particles.js';
import {
    initAudio, playClickSound, playPurchaseSound, playUpgradeSound,
    playAchievementSound, playZoneDiscoverySound, playCantAffordSound,
    playPrestigeSound, startAmbientMusic, stopAmbientMusic,
    setSoundEnabled, setMusicEnabled,
} from './audio.js';
import { exportSave, importSave, wipeSave } from './save.js';
import { state } from './state.js';

// --- DOM References ---
let dom = {};

// Click tier for visual feedback
function getClickTier() {
    let tier = 0;
    for (let i = CLICK_UPGRADES.length - 1; i >= 0; i--) {
        if (state.upgrades.includes(CLICK_UPGRADES[i].id)) { tier = i + 1; break; }
    }
    return tier;
}

// Buy quantity state: 1, 10, 100, or -1 for MAX
let buyQuantity = 1;

export function getBuyQuantity() { return buyQuantity; }

// --- Initialize UI ---
export function initUI() {
    dom = {
        starButton: document.getElementById('star-button'),
        starContainer: document.getElementById('star-container'),
        particleCanvas: document.getElementById('particle-canvas'),
        stardustCount: document.getElementById('stardust-count'),
        productionRate: document.getElementById('production-rate'),
        clickValueDisplay: document.getElementById('click-value-display'),
        ownedBuildings: document.getElementById('owned-buildings'),
        buildingList: document.getElementById('building-list'),
        upgradeList: document.getElementById('upgrade-list'),
        spacecraftList: document.getElementById('spacecraft-list'),
        tickerContent: document.getElementById('ticker-content'),
        zoneMap: document.getElementById('zone-map'),
        zoneInfo: document.getElementById('zone-info'),
        zoneInfoClose: document.getElementById('zone-info-close'),
        notificationStack: document.getElementById('notification-stack'),
        zonesExplored: document.getElementById('zones-explored'),

        // Patron
        patronBar: document.getElementById('patron-bar'),
        patronButton: document.getElementById('patron-button'),
        patronName: document.getElementById('patron-name'),
        patronDialogContainer: document.getElementById('patron-dialog-container'),
        patronDialogClose: document.getElementById('patron-dialog-close'),
        patronDialogName: document.getElementById('patron-dialog-name'),
        patronDialogDesc: document.getElementById('patron-dialog-desc'),
        patronDialogText: document.getElementById('patron-dialog-text'),
        patronDialogDrink: document.getElementById('patron-dialog-drink'),

        // Stats
        statTotalEarned: document.getElementById('stat-total-earned'),
        statAchievements: document.getElementById('stat-achievements'),
        statCosmicMemory: document.getElementById('stat-cosmic-memory'),
        statPrestigeCount: document.getElementById('stat-prestige-count'),

        // Overlays
        zoneDiscoveryOverlay: document.getElementById('zone-discovery-overlay'),
        prestigeOverlay: document.getElementById('prestige-overlay'),
        achievementOverlay: document.getElementById('achievement-overlay'),
        settingsOverlay: document.getElementById('settings-overlay'),
        offlineToast: document.getElementById('offline-toast'),

        // Prestige
        prestigeButtonContainer: document.getElementById('prestige-button-container'),
        btnPrestige: document.getElementById('btn-prestige'),
        prestigeBtnSub: document.getElementById('prestige-btn-sub'),

        // Shop tabs
        tabs: document.querySelectorAll('.shop-tab'),
        tabContents: document.querySelectorAll('.shop-content'),
    };

    // Init particle system
    initParticles(dom.particleCanvas);

    // Bind events
    bindStarClick();
    bindShopTabs();
    bindOverlayButtons();
    bindSettingsButtons();
    bindQuantitySelector();
    bindShopDelegation(); // Event delegation for all shop clicks
    bindPatronUI();

    // Build initial UI
    renderZoneMap();
    renderTicker();

    // Create cursor orbit container
    createCursorOrbit();
}

// --- Star Click ---
function bindStarClick() {
    let firstClick = true;

    let lastVisualTime = 0;
    let lastAudioTime = 0;
    let lastRealClick = 0;

    dom.starButton.addEventListener('click', (e) => {
        if (firstClick) {
            initAudio();
            startAmbientMusic();
            firstClick = false;
        }

        const now = performance.now();

        // Hard cap clicks to ~30 CPS to prevent the JS thread from overloading
        if (now - lastRealClick < 33) return;
        lastRealClick = now;

        const value = handleClick();
        const tier = getClickTier();

        // Milestone flash every 1000 clicks
        if (state.totalClicks % 1000 === 0 && state.totalClicks > 0) {
            const x = dom.particleCanvas.width / 2;
            const y = dom.particleCanvas.height / 2;
            spawnMilestoneParticles(x, y);
        }

        // Throttle audio strictly to max 10 sounds per second (Web Audio API limitation)
        if (now - lastAudioTime > 100) {
            playClickSound(tier);
            lastAudioTime = now;
        }

        // Throttle visual particles to max 20 frames per second
        if (now - lastVisualTime > 50) {
            lastVisualTime = now;

            const rect = dom.particleCanvas.getBoundingClientRect();
            const x = dom.particleCanvas.width / 2;
            const y = dom.particleCanvas.height / 2;
            const count = Math.min(5 + tier * 3, 25);
            spawnClickParticles(x, y, count, tier);
            spawnFloatingText(x, y - 30, `+${formatNumber(value)} ✦`);

            // Star flare animation
            dom.starButton.classList.remove('flare');
            void dom.starButton.offsetWidth; // trigger reflow
            dom.starButton.classList.add('flare');

            // Clean up flare without creating infinite timeouts
            setTimeout(() => dom.starButton.classList.remove('flare'), 40);
        }
    });
}

// --- Shop Tabs ---
function bindShopTabs() {
    dom.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dom.tabs.forEach(t => t.classList.remove('active'));
            dom.tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`shop-${tab.dataset.tab}`).classList.add('active');
        });
    });
}

// --- Overlay Buttons ---
function bindOverlayButtons() {
    // Zone info close
    dom.zoneInfoClose?.addEventListener('click', () => {
        dom.zoneInfo.style.display = 'none';
    });

    // Zone discovery continue
    document.getElementById('discovery-continue')?.addEventListener('click', () => {
        dom.zoneDiscoveryOverlay.style.display = 'none';
    });

    // Prestige
    dom.btnPrestige?.addEventListener('click', () => showPrestigeScreen());

    document.getElementById('btn-confirm-prestige')?.addEventListener('click', () => {
        playPrestigeSound();
        const result = performPrestige();
        dom.prestigeOverlay.style.display = 'none';
        if (result) {
            renderZoneMap();
        }
    });

    document.getElementById('btn-cancel-prestige')?.addEventListener('click', () => {
        dom.prestigeOverlay.style.display = 'none';
    });

    // Achievements panel
    document.getElementById('btn-achievements')?.addEventListener('click', () => {
        renderAchievementPanel();
        dom.achievementOverlay.style.display = 'flex';
    });

    document.getElementById('achievement-close')?.addEventListener('click', () => {
        dom.achievementOverlay.style.display = 'none';
    });

    // Settings
    document.getElementById('btn-settings')?.addEventListener('click', () => {
        dom.settingsOverlay.style.display = 'flex';
    });

    document.getElementById('settings-close')?.addEventListener('click', () => {
        dom.settingsOverlay.style.display = 'none';
    });

    // Offline toast
    document.getElementById('btn-dismiss-offline')?.addEventListener('click', () => {
        dom.offlineToast.style.display = 'none';
    });
}

// --- Settings ---
function bindSettingsButtons() {
    document.getElementById('setting-sound')?.addEventListener('change', (e) => {
        state.settings.sound = e.target.checked;
        setSoundEnabled(e.target.checked);
    });

    document.getElementById('setting-music')?.addEventListener('change', (e) => {
        state.settings.music = e.target.checked;
        setMusicEnabled(e.target.checked);
    });

    document.getElementById('btn-export-save')?.addEventListener('click', () => {
        const data = exportSave();
        if (data) {
            navigator.clipboard.writeText(data).then(() => {
                alert('Save exported to clipboard!');
            }).catch(() => {
                prompt('Copy this save string:', data);
            });
        }
    });

    document.getElementById('btn-import-save')?.addEventListener('click', () => {
        const data = prompt('Paste your save string:');
        if (data) {
            if (importSave(data)) {
                alert('Save imported! Reloading...');
                location.reload();
            } else {
                alert('Invalid save data.');
            }
        }
    });

    document.getElementById('btn-wipe-save')?.addEventListener('click', () => {
        if (confirm('Are you sure? This will permanently delete ALL progress.')) {
            if (confirm('Really? Everything will be gone forever.')) {
                wipeSave();
                location.reload();
            }
        }
    });
}

// --- Patron UI ---
function bindPatronUI() {
    if (!dom.patronButton) return;
    dom.patronButton.addEventListener('click', () => {
        const p = state.activePatron;
        if (!p) return;
        const pData = getPatron(p.id);
        if (!pData) return;

        state.activePatron.dialogueTriggered = true;

        dom.patronDialogName.textContent = pData.name;
        dom.patronDialogDesc.textContent = pData.description;
        dom.patronDialogDrink.textContent = `Drinking: ${pData.drink}`;

        let textToShow = pData.firstEncounter;
        if ((state.stats.patronVisits?.[p.id] || 0) > 1) {
            for (let i = pData.dialogue.length - 1; i >= 0; i--) {
                const entry = pData.dialogue[i];
                try {
                    if (entry.cond(state)) {
                        textToShow = entry.text;
                        break;
                    }
                } catch (e) { }
            }
        }
        textToShow = textToShow.replace(/\\n/g, '<br>');
        dom.patronDialogText.innerHTML = textToShow;

        dom.patronDialogContainer.style.display = 'flex';
        dom.patronButton.classList.remove('patron-waiting');
    });

    if (dom.patronDialogClose) {
        dom.patronDialogClose.addEventListener('click', () => {
            dom.patronDialogContainer.style.display = 'none';
        });
    }
}


// --- Main Update Loop (called by engine on each animation frame) ---
export function updateUI(s) {
    // Stardust counter
    dom.stardustCount.textContent = formatNumber(s.stardust);

    // Production rate
    const pps = calculateProductionPerSecond();
    dom.productionRate.textContent = `+${formatRate(pps)} per second`;

    // Click value
    dom.clickValueDisplay.textContent = `Click: +${formatNumber(getClickValue())} ✦`;

    // Auto-click rate
    const cursorCount = s.buildings.starCursor || 0;
    const autoClickDisplay = document.getElementById('auto-click-display');
    if (autoClickDisplay) {
        if (cursorCount > 0) {
            const autoRate = cursorCount * 0.1 * getClickValue();
            autoClickDisplay.textContent = `Auto: +${formatRate(autoRate)}/sec (×${cursorCount} cursors)`;
            autoClickDisplay.style.display = 'block';
        } else {
            autoClickDisplay.style.display = 'none';
        }
    }

    // Update cursor orbit visuals
    updateCursorOrbit(cursorCount);

    // Stats bar
    dom.statTotalEarned.textContent = formatNumber(s.totalEarned);
    dom.statAchievements.textContent = `${s.achievements.length} / ${ACHIEVEMENTS.length}`;
    dom.statCosmicMemory.textContent = `${s.cosmicMemory} ✧✧`;
    dom.statPrestigeCount.textContent = s.prestigeCount.toString();

    // Zones explored
    const visited = Object.values(s.zones).filter(z => z.visited).length;
    dom.zonesExplored.textContent = `${visited} zones explored`;

    // Update shop lists
    renderBuildingShop(s);
    renderUpgradeShop(s);
    renderSpacecraftShop(s);
    renderOwnedBuildings(s);
    updateZoneMap(s);

    // Prestige button visibility
    const progress = getPrestigeProgress();
    if (progress >= 0.5) {
        dom.prestigeButtonContainer.style.display = 'block';
        dom.prestigeBtnSub.textContent = `+${getPrestigeReward()} ✧✧ Cosmic Memory`;

        if (progress >= 1) {
            dom.btnPrestige.style.opacity = '1';
        } else {
            dom.btnPrestige.style.opacity = `${0.4 + progress * 0.6}`;
        }
    } else {
        dom.prestigeButtonContainer.style.display = 'none';
    }

    // Patron UI update
    if (s.activePatron) {
        if (dom.patronBar.style.display === 'none') {
            const pData = getPatron(s.activePatron.id);
            if (pData) {
                dom.patronName.textContent = pData.name;
                dom.patronBar.style.display = 'flex';
                if (!s.activePatron.dialogueTriggered) {
                    dom.patronButton.classList.add('patron-waiting');
                }
            }
        }
    } else {
        dom.patronBar.style.display = 'none';
        dom.patronDialogContainer.style.display = 'none';
    }

    // Check for new achievements
    const newAchievements = popNewAchievements();
    for (const ach of newAchievements) {
        showAchievementToast(ach);
        playAchievementSound();
    }

    // Check for pending news
    const news = popPendingNews();
    for (const headline of news) {
        addTickerHeadline(headline);
    }

    // Stardust color shift near prestige
    if (progress >= 0.9) {
        dom.stardustCount.style.color = '#FDE68A';
        dom.stardustCount.style.textShadow = '0 0 30px rgba(245, 158, 11, 0.5)';
    } else {
        dom.stardustCount.style.color = '';
        dom.stardustCount.style.textShadow = '';
    }
}

// --- Quantity Selector ---
function bindQuantitySelector() {
    document.querySelectorAll('[data-qty]').forEach(btn => {
        btn.addEventListener('click', () => {
            buyQuantity = parseInt(btn.dataset.qty);
            document.querySelectorAll('[data-qty]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// --- Shop Event Delegation (bound ONCE, survives DOM rebuilds) ---
function bindShopDelegation() {
    // Buildings: Buy & Sell
    dom.buildingList.addEventListener('mousedown', (e) => {
        console.log('[SHOP DEBUG] Click target:', e.target.tagName, e.target.className, 'data-buy:', e.target.dataset?.buyBuilding);
        const buyBtn = e.target.closest('[data-buy-building]');
        console.log('[SHOP DEBUG] buyBtn found:', buyBtn, buyBtn?.dataset?.buyBuilding);
        if (buyBtn) {
            e.stopPropagation();
            const id = buyBtn.dataset.buyBuilding;
            console.log('[SHOP DEBUG] Buying building:', id, 'qty:', buyQuantity);

            let qty = buyQuantity;
            if (qty === -1) qty = getMaxAffordable(id);
            if (qty <= 0) {
                console.log('[SHOP DEBUG] qty <= 0, shaking');
                const row = buyBtn.closest('.shop-item');
                row.classList.add('shake');
                playCantAffordSound();
                setTimeout(() => row.classList.remove('shake'), 300);
                return;
            }

            console.log('[SHOP DEBUG] Attempting purchase, qty:', qty, 'canAfford:', canAffordBuilding(id, qty));
            if (canAffordBuilding(id, qty)) {
                const result = purchaseBuilding(id, qty);
                console.log('[SHOP DEBUG] Purchase result:', result);
                playPurchaseSound();
            } else {
                console.log('[SHOP DEBUG] Cannot afford');
                const row = buyBtn.closest('.shop-item');
                row.classList.add('shake');
                playCantAffordSound();
                setTimeout(() => row.classList.remove('shake'), 300);
            }
            return;
        }

        // Buildings: Sell
        const sellBtn = e.target.closest('[data-sell-building]');
        if (sellBtn) {
            e.stopPropagation();
            const id = sellBtn.dataset.sellBuilding;
            console.log('[SHOP DEBUG] Selling building:', id);
            sellBuilding(id);
            return;
        }

        // Buildings: Expand/collapse flavor text
        const row = e.target.closest('[data-building]');
        if (row) {
            row.classList.toggle('expanded');
        }
    });

    // Upgrades
    dom.upgradeList.addEventListener('mousedown', (e) => {
        const buyBtn = e.target.closest('[data-upgrade]');
        if (buyBtn) {
            e.stopPropagation();
            const id = buyBtn.dataset.upgrade;
            if (canAffordUpgrade(id)) {
                purchaseUpgrade(id);
                playUpgradeSound();
                renderZoneMap(); // Force layout update for newly unlocked zones
            } else {
                const row = buyBtn.closest('.shop-item');
                row.classList.add('shake');
                playCantAffordSound();
                setTimeout(() => row.classList.remove('shake'), 300);
            }
        }
    });

    // Spacecraft
    dom.spacecraftList.addEventListener('mousedown', (e) => {
        const buyBtn = e.target.closest('[data-spacecraft]');
        if (buyBtn) {
            e.stopPropagation();
            const id = buyBtn.dataset.spacecraft;
            if (state.spacecraft.includes(id)) return;
            if (canAffordSpacecraft(id)) {
                purchaseSpacecraft(id);
                playUpgradeSound();
                renderZoneMap();
            } else {
                const row = buyBtn.closest('.shop-item');
                row.classList.add('shake');
                playCantAffordSound();
                setTimeout(() => row.classList.remove('shake'), 300);
            }
        }
    });
}

// --- Building Shop ---
function renderBuildingShop(s) {
    const unlockedData = getUnlockedBuildings();
    const items = [];

    for (const buildingData of unlockedData) {
        const buildingId = buildingData.id;
        const status = buildingData.status;
        const building = getBuilding(buildingId);
        const count = s.buildings[buildingId] || 0;

        // Calculate effective quantity and cost
        let qty = buyQuantity;
        if (qty === -1) {
            qty = getMaxAffordable(buildingId);
        }
        if (qty <= 0) qty = 1; // Show cost of 1 even if can't afford

        const cost = getBulkBuyCost(buildingId, count, qty);
        const canAfford = s.stardust >= cost;
        const effectiveQty = buyQuantity === -1 ? getMaxAffordable(buildingId) : buyQuantity;
        const flavorText = getBuildingFlavorText(buildingId, count);
        const production = building.baseProduction;
        const sellPrice = getSellPrice(buildingId);

        // Label for buy button
        let buyLabel;
        if (buyQuantity === -1) {
            buyLabel = effectiveQty > 0
                ? `Buy ${effectiveQty} · ${formatNumber(getBulkBuyCost(buildingId, count, effectiveQty))} ✦`
                : `Buy MAX · ---`;
        } else {
            buyLabel = `Buy ${qty > 1 ? qty + ' · ' : '· '}${formatNumber(cost)} ✦`;
        }

        const canBuy = buyQuantity === -1 ? effectiveQty > 0 : canAfford;

        if (status === 'silhouette') {
            items.push(`
      <div class="shop-item cant-afford silhouette" data-building="${buildingId}" data-type="building" style="opacity: 0.7; filter: grayscale(1);">
        <div class="shop-item-info">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name">???</div>
              <div class="shop-item-production">Discover new tech to unlock</div>
            </div>
            <div class="shop-item-count-badge">🔒</div>
          </div>
          <div class="shop-item-desc" style="font-style: italic;">We don't have the blueprints for this yet.</div>
          <div class="shop-item-buy-row">
            <button class="btn-buy btn-buy-disabled">
              Buy ${qty > 1 ? qty + ' · ' : '· '}??? ✦
            </button>
          </div>
        </div>
      </div>
            `);
            continue;
        }

        items.push(`
      <div class="shop-item ${canBuy ? 'can-afford' : 'cant-afford'}" data-building="${buildingId}" data-type="building">
        <div class="shop-item-info">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name">${building.name}${building.isAutoclicker ? ' ✨' : ''}</div>
              <div class="shop-item-production">${building.isAutoclicker
                ? `Auto-clicks: ${(count * 0.1).toFixed(1)}/sec`
                : `+${formatRate(production)}/sec each`
            }</div>
            </div>
            <div class="shop-item-count-badge">${count}</div>
          </div>
          <div class="shop-item-desc">${building.description}</div>
          <div class="shop-item-buy-row">
            <button class="btn-buy ${canBuy ? '' : 'btn-buy-disabled'}" data-buy-building="${buildingId}">
              ${buyLabel}
            </button>
          </div>
          ${count > 0 ? `
            <div class="shop-item-sell-row">
              <button class="btn-sell" data-sell-building="${buildingId}">
                Sell 1 · +${formatNumber(sellPrice)} ✦
              </button>
            </div>
          ` : ''}
          <div class="shop-item-flavor">${flavorText}</div>
        </div>
      </div>
    `);
    }

    dom.buildingList.innerHTML = items.join('');
    // Click handlers are managed by bindShopDelegation() — no per-element binding needed
}

// --- Cursor Orbit Visual ---
function createCursorOrbit() {
    const container = document.getElementById('star-container');
    if (!container) return;

    // Add orbit container
    let orbit = document.getElementById('cursor-orbit');
    if (!orbit) {
        orbit = document.createElement('div');
        orbit.id = 'cursor-orbit';
        orbit.className = 'cursor-orbit';
        container.appendChild(orbit);
    }
}

function updateCursorOrbit(cursorCount) {
    const orbit = document.getElementById('cursor-orbit');
    if (!orbit) return;

    // Show up to 20 visual cursors, evenly distributed
    const visualCount = Math.min(cursorCount, 20);
    const existing = orbit.children.length;

    if (visualCount === existing) return; // no change needed

    orbit.innerHTML = '';
    for (let i = 0; i < visualCount; i++) {
        const cursor = document.createElement('div');
        cursor.className = 'orbit-cursor';
        const angle = (360 / visualCount) * i;
        const speed = 8 + (i % 3) * 2; // slight speed variation
        cursor.style.setProperty('--angle', `${angle}deg`);
        cursor.style.setProperty('--speed', `${speed}s`);
        cursor.style.setProperty('--size', cursorCount > 50 ? '6px' : cursorCount > 20 ? '7px' : '8px');
        orbit.appendChild(cursor);
    }
}

// --- Upgrade Shop ---
function renderUpgradeShop(s) {
    const available = getAllUpgrades().filter(u => {
        if (s.upgrades.includes(u.id)) return false;
        return isUpgradeUnlocked(u.id);
    });

    if (available.length === 0) {
        dom.upgradeList.innerHTML = '<div class="shop-item" style="opacity:0.4;cursor:default;"><div class="shop-item-info"><div class="shop-item-name">No upgrades available</div><div class="shop-item-desc">Keep building to unlock more.</div></div></div>';
        return;
    }

    const items = available.map(upgrade => {
        const effectiveCost = Math.floor(upgrade.cost * getUpgradeCostDiscount());
        const canAfford = s.stardust >= effectiveCost;
        let effectText = '';
        if (upgrade.clickValue) effectText = `Click → ${upgrade.clickValue} ✦`;
        else if (upgrade.multiplier) effectText = `×${upgrade.multiplier} production`;
        else if (upgrade.effect) {
            if (upgrade.effect.type === 'allProduction') effectText = `All buildings ×${upgrade.effect.value}`;
            else if (upgrade.effect.type === 'passiveProduction') effectText = `Passive +${Math.round((upgrade.effect.value - 1) * 100)}%`;
            else if (upgrade.effect.type === 'passiveClick') effectText = `Automates clicking`;
            else if (upgrade.effect.type === 'unlockTrappistPlanets') effectText = `Unlocks all 7 TRAPPIST-1 sub-planets`;
            else if (upgrade.effect.type === 'revealUpgrade') effectText = `Reveals the final answer`;
            else if (upgrade.effect.type === 'explorationSpeed') effectText = `+${Math.round((upgrade.effect.value - 1) * 100)}% exploration speed`;
            else if (upgrade.effect.type === 'spacecraftDiscount') effectText = `Spacecraft cost -${Math.round((1 - upgrade.effect.value) * 100)}%`;
            else if (upgrade.effect.type === 'allZoneBonus') effectText = `Zone completion effects ×${upgrade.effect.value}`;
            else effectText = upgrade.effect.type;
        }

        return `
      <div class="shop-item ${canAfford ? 'can-afford' : 'cant-afford'}" data-type="upgrade">
        <div class="shop-item-info">
          <div class="shop-item-name">${upgrade.name}</div>
          <div class="shop-item-desc">${upgrade.flavorText}</div>
          <div class="shop-item-effect">${effectText}</div>
          <div class="shop-item-buy-row">
            <button class="btn-buy ${canAfford ? '' : 'btn-buy-disabled'}" data-upgrade="${upgrade.id}">
              Buy · ${formatNumber(effectiveCost)} ✦
            </button>
          </div>
        </div>
      </div>
    `;
    });

    dom.upgradeList.innerHTML = items.join('');
    // Click handlers are managed by bindShopDelegation()
}

// --- Spacecraft Shop ---
function renderSpacecraftShop(s) {
    const items = SPACECRAFT.map(craft => {
        const owned = s.spacecraft.includes(craft.id);
        const canAfford = !owned && canAffordSpacecraft(craft.id);
        const cost = Math.floor(craft.cost * getSpacecraftCostDiscount());

        let buyButtonHtml = '';
        if (owned) {
            buyButtonHtml = `<div class="shop-item-buy-row"><button class="btn-buy btn-buy-disabled" disabled>Owned</button></div>`;
        } else {
            buyButtonHtml = `
              <div class="shop-item-buy-row">
                <button class="btn-buy ${canAfford ? '' : 'btn-buy-disabled'}" data-spacecraft="${craft.id}">
                  Buy · ${formatNumber(cost)} ✦
                </button>
              </div>`;
        }

        return `
      <div class="shop-item ${owned ? 'owned' : canAfford ? 'can-afford' : 'cant-afford'}" data-type="spacecraft">
        <div class="shop-item-info">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name">${craft.name} ${owned ? '✓' : ''}</div>
              <div class="shop-item-effect">${craft.specialAbility}</div>
            </div>
            <div class="shop-item-count-badge">${craft.range}</div>
          </div>
          <div class="shop-item-desc">${craft.flavorText}</div>
          <div style="font-size:10px; color:var(--mid-gray); margin-bottom:var(--space-xs)">Inspired by: ${craft.realInspiration}</div>
          ${buyButtonHtml}
        </div>
      </div>
    `;
    });

    dom.spacecraftList.innerHTML = items.join('');
    // Click handlers are managed by bindShopDelegation()
}

// --- Owned Buildings Summary ---
function renderOwnedBuildings(s) {
    const items = BUILDING_ORDER
        .filter(id => (s.buildings[id] || 0) > 0)
        .map(id => {
            const b = getBuilding(id);
            return `<div class="owned-building-row"><span>${b.name}</span><span class="count">${s.buildings[id]}</span></div>`;
        });

    dom.ownedBuildings.innerHTML = items.join('');
}

// --- Zone Map ---
const ZONE_ICONS = {
    earthOrbit: '🌍', moon: '🌙', mars: '🔴', asteroidBelt: '🪨',
    jupiter: '🟠', saturn: '💍', pluto: '💙', oortCloud: '❄️',
};

function renderZoneMap() {
    const zones = getZonesSorted();
    const items = zones.map(zone => {
        const zoneState = state.zones[zone.id];
        const status = !zoneState ? 'locked' : zoneState.visited ? 'visited' : 'unlocked';
        const statusText = status === 'locked' ? 'Locked' : status === 'visited' ? '✓ Explored' : 'Ready to explore';

        return `
      <div class="zone-node ${status}" data-zone="${zone.id}">
        <div class="zone-node-icon">${ZONE_ICONS[zone.id] || '✦'}</div>
        <div class="zone-node-info">
          <div class="zone-node-name">${zone.name}</div>
          <div class="zone-node-status ${status === 'visited' ? 'explored' : ''}">${statusText}</div>
        </div>
      </div>
    `;
    });

    dom.zoneMap.innerHTML = items.join('');

    // Bind zone clicks
    dom.zoneMap.querySelectorAll('.zone-node.unlocked').forEach(el => {
        el.addEventListener('click', () => {
            const zoneId = el.dataset.zone;
            if (visitZone(zoneId)) {
                showZoneDiscovery(zoneId);
                playZoneDiscoverySound();
                renderZoneMap();
            }
        });
    });

    dom.zoneMap.querySelectorAll('.zone-node.visited').forEach(el => {
        el.addEventListener('click', () => {
            showZoneInfo(el.dataset.zone);
        });
    });
}

function updateZoneMap(s) {
    // Update unlock states dynamically
    dom.zoneMap.querySelectorAll('.zone-node.locked').forEach(el => {
        const zoneId = el.dataset.zone;
        const zoneState = s.zones[zoneId];
        if (zoneState?.unlocked) {
            el.classList.remove('locked');
            el.classList.add('unlocked');
            el.querySelector('.zone-node-status').textContent = 'Ready to explore';

            // Bind click
            el.addEventListener('click', () => {
                if (visitZone(zoneId)) {
                    showZoneDiscovery(zoneId);
                    playZoneDiscoverySound();
                    renderZoneMap();
                }
            });
        }
    });
}

// --- Zone Discovery Overlay ---
function showZoneDiscovery(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return;

    document.getElementById('discovery-zone-name').textContent = zone.name;
    document.getElementById('discovery-zone-text').textContent = zone.discoveryText;

    const factsContainer = document.getElementById('discovery-zone-facts');
    factsContainer.innerHTML = zone.realFacts.map((fact, i) =>
        `<div class="discovery-fact" style="animation-delay: ${(i + 1) * 0.8}s">${fact}</div>`
    ).join('');

    const rewardContainer = document.getElementById('discovery-zone-reward');
    rewardContainer.innerHTML = `
    <div class="reward-name">${zone.ingredient.name}</div>
    <div class="reward-effect">${zone.ingredient.description}</div>
  `;

    // Add zone dispatch to ticker
    if (ZONE_DISPATCHES[zoneId]) {
        addTickerHeadline(ZONE_DISPATCHES[zoneId]);
    }

    dom.zoneDiscoveryOverlay.style.display = 'flex';
}

// --- Zone Info Panel ---
function showZoneInfo(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return;

    document.getElementById('zone-info-name').textContent = zone.name;
    document.getElementById('zone-info-text').textContent = zone.discoveryText;

    document.getElementById('zone-facts').innerHTML = zone.realFacts
        .map(f => `<div class="zone-fact">${f}</div>`)
        .join('');

    document.getElementById('zone-reward').innerHTML =
        `<strong>${zone.ingredient.name}</strong> — ${zone.ingredient.description}`;

    dom.zoneInfo.style.display = 'block';
}

// --- Achievement Toast ---
function showAchievementToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
    <div class="achievement-toast-title">🏆 ${achievement.name}</div>
    <div class="achievement-toast-text">${achievement.flavorText}</div>
  `;

    dom.notificationStack.appendChild(toast);

    // Max 3 visible
    const toasts = dom.notificationStack.querySelectorAll('.achievement-toast');
    if (toasts.length > 3) {
        toasts[0].classList.add('out');
        setTimeout(() => toasts[0].remove(), 300);
    }

    // Remove after 8 seconds
    setTimeout(() => {
        toast.classList.add('out');
        setTimeout(() => toast.remove(), 300);
    }, 8000);
}

// --- Achievement Panel ---
function renderAchievementPanel() {
    const grid = document.getElementById('achievement-grid');
    grid.innerHTML = ACHIEVEMENTS.map(ach => {
        const earned = state.achievements.includes(ach.id);
        const isHidden = ach.hidden && !earned;

        return `
      <div class="achievement-card ${earned ? 'earned' : ''} ${isHidden ? 'hidden-locked' : ''}">
        <div class="achievement-card-name">${isHidden ? '???' : ach.name}</div>
        <div class="achievement-card-text">${isHidden ? 'Hidden achievement' : ach.flavorText}</div>
        ${ach.bonus ? `<div class="achievement-card-bonus">${earned ? '✓ Active' : ''}</div>` : ''}
      </div>
    `;
    }).join('');
}

// --- Prestige Screen ---
function showPrestigeScreen() {
    if (!canPrestige()) return;

    const quotes = [
        "The Big Bang was not an explosion in space - it was an expansion of space itself. There was no center. Every point was the origin.",
        "In the first 3 minutes after the Big Bang, the universe formed all the hydrogen and helium that exists. Everything else was made later, inside stars.",
        "The cosmic microwave background radiation - the afterglow of the Big Bang - still fills the entire universe today.",
        "Before the Big Bang, there was no 'before.' Time itself began with the Big Bang.",
        "The observable universe contains approximately 2 trillion galaxies. Each was seeded by tiny quantum fluctuations in the first fraction of a second.",
    ];

    document.getElementById('prestige-quote').textContent =
        `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    document.getElementById('prestige-stats').innerHTML = `
    <div class="prestige-stat-row"><span class="prestige-stat-label">Stardust this run</span><span class="prestige-stat-value">${formatExact(state.totalEarned)}</span></div>
    <div class="prestige-stat-row"><span class="prestige-stat-label">Cosmic Memory earned</span><span class="prestige-stat-value">+${getPrestigeReward()} ✧✧</span></div>
    <div class="prestige-stat-row"><span class="prestige-stat-label">Next run multiplier</span><span class="prestige-stat-value">×${((1 + (state.cosmicMemory + getPrestigeReward()) * 0.10)).toFixed(1)}</span></div>
    <div class="prestige-stat-row"><span class="prestige-stat-label">Buildings lost</span><span class="prestige-stat-value" style="color:var(--red-dwarf)">All</span></div>
    <div class="prestige-stat-row"><span class="prestige-stat-label">Achievements kept</span><span class="prestige-stat-value" style="color:var(--star-green)">All</span></div>
  `;

    dom.prestigeOverlay.style.display = 'flex';
}

// --- News Ticker (Continuous Marquee) ---
let tickerHeadlines = [];
let tickerScrollPos = 0;
let tickerAnimFrame = null;
let lastTickerTime = 0;
const TICKER_SPEED = 30; // pixels per second - relaxed reading pace
const TICKER_SEPARATOR = ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ';
let pendingTickerInserts = [];

function renderTicker() {
    // Initialize with general news
    tickerHeadlines = [...GENERAL_NEWS];
    if (state.prestigeCount > 0) {
        tickerHeadlines.push(...PRESTIGE_NEWS);
    }
    tickerHeadlines.push(...PATRON_NEWS);

    // Shuffle
    tickerHeadlines.sort(() => Math.random() - 0.5);

    // Build the full ticker string and duplicate it for seamless loop
    rebuildTickerContent();
    startTickerAnimation();
}

function rebuildTickerContent() {
    const fullText = tickerHeadlines.join(TICKER_SEPARATOR) + TICKER_SEPARATOR;
    // Create two copies so when one scrolls off, the second is ready
    dom.tickerContent.innerHTML =
        `<span class="ticker-block">${fullText}</span>` +
        `<span class="ticker-block">${fullText}</span>`;
    dom.tickerContent.style.animation = 'none';
    dom.tickerContent.style.transform = 'translateX(0)';
}

function startTickerAnimation() {
    lastTickerTime = performance.now();
    tickerScrollPos = 0;

    function tickerFrame(now) {
        const dt = (now - lastTickerTime) / 1000;
        lastTickerTime = now;

        tickerScrollPos += TICKER_SPEED * dt;

        // Get width of one copy of the text
        const firstBlock = dom.tickerContent.querySelector('.ticker-block');
        if (firstBlock) {
            const blockWidth = firstBlock.offsetWidth;
            // When we've scrolled past one full copy, reset to create infinite loop
            if (blockWidth > 0 && tickerScrollPos >= blockWidth) {
                tickerScrollPos -= blockWidth;
                // Process any pending inserts on loop reset
                if (pendingTickerInserts.length > 0) {
                    tickerHeadlines.push(...pendingTickerInserts);
                    pendingTickerInserts = [];
                    rebuildTickerContent();
                }
            }
        }

        dom.tickerContent.style.transform = `translateX(-${tickerScrollPos}px)`;
        tickerAnimFrame = requestAnimationFrame(tickerFrame);
    }

    if (tickerAnimFrame) cancelAnimationFrame(tickerAnimFrame);
    tickerAnimFrame = requestAnimationFrame(tickerFrame);
}

function addTickerHeadline(headline) {
    // Queue for insertion on next loop to avoid visual glitch
    pendingTickerInserts.push(headline);
}

// --- Show Offline Production ---
export function showOfflineProduction(amount) {
    if (amount <= 0) return;
    document.getElementById('offline-production-text').textContent =
        `While you were away, your brewery produced ${formatNumber(amount)} ✦ stardust.`;
    dom.offlineToast.style.display = 'block';
}
