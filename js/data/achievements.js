/**
 * Nebula Brewery — Achievements Data
 * All achievements from GDD Section 7.
 */

export const ACHIEVEMENTS = [
    // --- Production Achievements (GDD 7.1) ---
    {
        id: 'prod_firstLight', name: 'First Light', category: 'production',
        condition: (s) => s.totalEarned >= 10, bonus: null,
        flavorText: "It begins. As all great things do: with a single click in the dark."
    },
    {
        id: 'prod_warmingUp', name: 'Warming Up', category: 'production',
        condition: (s) => s.totalEarned >= 1000, bonus: { type: 'allProduction', value: 0.01 },
        flavorText: "You're just getting started. The universe can feel it."
    },
    {
        id: 'prod_millionaire', name: 'Stardust Millionaire', category: 'production',
        condition: (s) => s.totalEarned >= 1000000, bonus: { type: 'allProduction', value: 0.02 },
        flavorText: "You've earned a million stardust. You spend it immediately. This is correct."
    },
    {
        id: 'prod_billionaire', name: 'Billionaire of the Cosmos', category: 'production',
        condition: (s) => s.totalEarned >= 1000000000, bonus: { type: 'allProduction', value: 0.03 },
        flavorText: "A billion stardust. There are fewer than 8 billion humans on Earth. You've outproduced them all. Combined. Repeatedly."
    },
    {
        id: 'prod_trillion', name: 'The Trillion Club', category: 'production',
        condition: (s) => s.totalEarned >= 1000000000000, bonus: { type: 'allProduction', value: 0.05 },
        flavorText: "At this point, the numbers have stopped meaning anything and started meaning everything."
    },
    {
        id: 'prod_infinite', name: 'Infinite Brew', category: 'production',
        condition: (s) => s.totalEarned >= 1000000000000000, bonus: null,
        flavorText: "You were warned. You didn't stop. Nobody expected you to stop. This is why we built this."
    },

    // --- Building Achievements (GDD 7.2) ---
    {
        id: 'bldg_stargazer', name: 'Stargazer', category: 'building',
        condition: (s) => s.buildings.observatory >= 1, bonus: { type: 'buildingProduction', buildingId: 'observatory', value: 0.01 },
        flavorText: "One telescope pointed at the infinite. An appropriate start."
    },
    {
        id: 'bldg_obsNetwork', name: 'The Observatory Network', category: 'building',
        condition: (s) => s.buildings.observatory >= 100, bonus: { type: 'buildingProduction', buildingId: 'observatory', value: 0.05 },
        flavorText: "100 telescopes. The sky is yours. The sky does not know this yet."
    },
    {
        id: 'bldg_distilleryOwner', name: 'Distillery Owner', category: 'building',
        condition: (s) => s.buildings.cosmicDistillery >= 1, bonus: null,
        flavorText: "A distillery in space. There were definitely easier ways to get rich. You didn't take them."
    },
    {
        id: 'bldg_masterDistiller', name: 'Master Distiller', category: 'building',
        condition: (s) => s.buildings.cosmicDistillery >= 50, bonus: { type: 'buildingProduction', buildingId: 'cosmicDistillery', value: 0.05 },
        flavorText: "Fifty distilleries. The plasma coils never sleep. Neither do you, honestly."
    },
    {
        id: 'bldg_cloudFarmer', name: 'Cloud Farmer', category: 'building',
        condition: (s) => s.buildings.nebulaFarm >= 1, bonus: null,
        flavorText: "You have planted flags in a nebula. The hydrogen is confused."
    },
    {
        id: 'bldg_stormChaser', name: 'Storm Chaser', category: 'building',
        condition: (s) => s.buildings.pulsarEngine >= 1, bonus: null,
        flavorText: "Neutron star. 716 rotations per second. You harnessed it. For beer."
    },
    {
        id: 'bldg_eventHorizonAdj', name: 'Event Horizon Adjacent', category: 'building',
        condition: (s) => s.buildings.blackHoleTap >= 1, bonus: null,
        flavorText: "You tapped a black hole. This is either the bravest or most questionable thing anyone has done in this galaxy."
    },
    {
        id: 'bldg_wormholeCommuter', name: 'Wormhole Commuter', category: 'building',
        condition: (s) => s.buildings.wormholePipeline >= 10, bonus: { type: 'buildingProduction', buildingId: 'wormholePipeline', value: 0.05 },
        flavorText: "You have normalized travel through tears in spacetime. The commute is faster. The existential weight is the same."
    },
    {
        id: 'bldg_dysonDreamer', name: 'Dyson Sphere Dreamer', category: 'building',
        condition: (s) => s.buildings.dysonSwarm >= 1, bonus: null,
        flavorText: "Freeman Dyson proposed this in 1960. He didn't think anyone would actually do it. You did it ten times."
    },
    {
        id: 'bldg_industrialist', name: 'Galactic Industrialist', category: 'building',
        condition: (s) => Object.values(s.buildings).every(c => c >= 1), bonus: { type: 'allProduction', value: 0.10 },
        flavorText: "You built them all. The universe didn't ask for this. The universe got it."
    },

    // --- Exploration Achievements (GDD 7.3) ---
    {
        id: 'exp_oneSmallSip', name: 'One Small Sip', category: 'exploration',
        condition: (s) => s.zones.earthOrbit?.visited, bonus: { type: 'clickValue', value: 0.10 },
        flavorText: "250 miles up. You can see the curve. Everything looks smaller and more precious."
    },
    {
        id: 'exp_footprints', name: 'Footprints Respected', category: 'exploration',
        condition: (s) => s.zones.moon?.visited, bonus: null,
        flavorText: "You didn't step on Armstrong's footprint. Respect acknowledged by the universe."
    },
    {
        id: 'exp_martianBrewer', name: 'Martian Brewer', category: 'exploration',
        condition: (s) => s.zones.mars?.visited, bonus: null,
        flavorText: "Olympus Mons is the largest mountain in the solar system. You built a brewery at its base. Priorities."
    },
    {
        id: 'exp_rockCollector', name: 'Rock Collector', category: 'exploration',
        condition: (s) => s.zones.asteroidBelt?.visited, bonus: { type: 'allProduction', value: 0.15 },
        flavorText: "Between the planets, in the debris of a world that never was, you found gold."
    },
    {
        id: 'exp_greatRed', name: 'Great Red Regular', category: 'exploration',
        condition: (s) => s.zones.jupiter?.visited, bonus: { type: 'allProduction', value: 0.20 },
        flavorText: "You waved at a 400-year-old storm. It did not wave back. You respect this consistency."
    },
    {
        id: 'exp_ringBearer', name: 'Ring Bearer', category: 'exploration',
        condition: (s) => s.zones.saturn?.visited, bonus: { type: 'allProduction', value: 0.20 },
        flavorText: "Ice particles. House-sized. Paper-thin rings. You flew through them all. You collected samples. Cocktails pending."
    },
    {
        id: 'exp_plutosHeart', name: "Pluto's Heart", category: 'exploration',
        condition: (s) => s.zones.pluto?.visited, bonus: { type: 'allProduction', value: 0.25 },
        flavorText: "You left a bottle for the demoted dwarf planet. It appreciated the gesture. You think."
    },
    {
        id: 'exp_edgeWalker', name: 'Edge Walker', category: 'exploration',
        condition: (s) => s.zones.oortCloud?.visited, bonus: { type: 'allProduction', value: 0.30 },
        flavorText: "You're at the edge of the solar system. The Sun is a star now. Just another star. You feel something."
    },

    // --- Click Achievements (GDD 7.4) ---
    {
        id: 'click_firstContact', name: 'First Contact', category: 'click',
        condition: (s) => s.totalClicks >= 1, bonus: null,
        flavorText: "The first click. The one that started it all. The universe felt it."
    },
    {
        id: 'click_tapper', name: 'Tapper', category: 'click',
        condition: (s) => s.totalClicks >= 100, bonus: null,
        flavorText: "100 clicks. Your dedication is noted. Your fingertip is fine."
    },
    {
        id: 'click_persistent', name: 'Persistent', category: 'click',
        condition: (s) => s.totalClicks >= 1000, bonus: { type: 'clickValue', value: 0.01 },
        flavorText: "1,000 clicks. You could have stopped at any point. You didn't. The stars approve."
    },
    {
        id: 'click_theGrind', name: 'The Grind', category: 'click',
        condition: (s) => s.totalClicks >= 10000, bonus: { type: 'clickValue', value: 0.02 },
        flavorText: "10,000 clicks. That's not clicking anymore. That's a lifestyle."
    },
    {
        id: 'click_botFingers', name: 'Bot Fingers', category: 'click',
        condition: (s) => s.totalClicks >= 100000, bonus: { type: 'clickValue', value: 0.03 },
        flavorText: "You know cookie clicker players used auto-clickers? We see you. The achievement is earned regardless."
    },
    {
        id: 'click_oneWithClick', name: 'One With The Click', category: 'click',
        condition: (s) => s.totalClicks >= 1000000, bonus: { type: 'clickValue', value: 0.05 },
        flavorText: "A million clicks. You have transcended clicking. You are clicking. Clicking is you."
    },

    // --- Hidden/Secret Achievements (GDD 7.5) ---
    {
        id: 'secret_nightOwl', name: 'Night Owl', category: 'secret', hidden: true,
        condition: (s) => s.totalPlaytime >= 21600, bonus: { type: 'overnightProduction', value: 0.05 },
        flavorText: "Six consecutive hours. The night is yours. The stars are awake too."
    },
    {
        id: 'secret_waitingUniverse', name: 'Waiting on the Universe', category: 'secret', hidden: true,
        condition: (s) => s.secretFlags.idleFor8Hours, bonus: null,
        flavorText: "Patience Unlocked. The universe rewards those who wait."
    },
    {
        id: 'secret_longGame', name: 'The Long Game', category: 'secret', hidden: true,
        condition: (s) => s.totalPlaytime >= 2592000, bonus: null,
        flavorText: "30 days of play. You're not casual anymore. You're cosmic."
    },
    {
        id: 'secret_completionist', name: 'Completionist', category: 'secret', hidden: true,
        condition: (s) => s.secretFlags.allUpgradesOneRun, bonus: { type: 'allProduction', value: 0.10 },
        flavorText: "Every upgrade in one run. Impressive. The stardust respects dedication."
    },
    {
        id: 'secret_botQuestion', name: 'The Bot Question', category: 'secret', hidden: true,
        condition: (s) => s.secretFlags.rapidClicker, bonus: null,
        flavorText: "We're not judging. The stardust is real either way."
    },
];

export function getAchievement(id) {
    return ACHIEVEMENTS.find(a => a.id === id);
}

export function getAchievementsByCategory(category) {
    return ACHIEVEMENTS.filter(a => a.category === category);
}
