/**
 * Nebula Brewery — Upgrades Data
 * All upgrades from GDD Section 4: click, building, global, and space tech.
 */

// --- Click Upgrades (GDD 4.1) ---
export const CLICK_UPGRADES = [
    {
        id: 'click_betterTelescopes',
        name: 'Better Telescopes',
        cost: 100,
        clickValue: 2,
        unlockCondition: (state) => state.buildings.observatory >= 1,
        flavorText: "Bigger lens. Deeper space. More stardust. Science.",
    },
    {
        id: 'click_reinforcedTap',
        name: 'Reinforced Tap',
        cost: 500,
        clickValue: 5,
        unlockCondition: (state) => state.totalEarned >= 50,
        flavorText: "You hit it harder. It produces more. Nobody questions this.",
    },
    {
        id: 'click_quantumFingers',
        name: 'Quantum Fingers',
        cost: 2000,
        clickValue: 10,
        unlockCondition: (state) => state.totalEarned >= 500,
        flavorText: "Your fingers now operate on a subatomic level. Please stop touching things.",
    },
    {
        id: 'click_stellarStrike',
        name: 'Stellar Strike',
        cost: 10000,
        clickValue: 25,
        unlockCondition: (state) => state.totalEarned >= 5000,
        flavorText: "Each click contains the force of a small stellar event. Small.",
    },
    {
        id: 'click_supernovaPalm',
        name: 'Supernova Palm',
        cost: 75000,
        clickValue: 75,
        unlockCondition: (state) => state.totalEarned >= 50000,
        flavorText: "Technically you should be wearing gloves.",
    },
    {
        id: 'click_pulsarPunch',
        name: 'Pulsar Punch',
        cost: 500000,
        clickValue: 200,
        unlockCondition: (state) => state.totalEarned >= 500000,
        flavorText: "716 clicks per second is the theoretical max. You're approaching it.",
    },
    {
        id: 'click_eventHorizonTap',
        name: 'Event Horizon Tap',
        cost: 5000000,
        clickValue: 1000,
        unlockCondition: (state) => state.totalEarned >= 5000000,
        flavorText: "One tap. One event horizon. Uncountable consequences.",
    },
    {
        id: 'click_bigBangClick',
        name: 'Big Bang Click',
        cost: 50000000,
        clickValue: 5000,
        unlockCondition: (state) => state.totalEarned >= 50000000,
        flavorText: "The first click. The original. You've come full circle.",
    },
];

// --- Building Upgrades (GDD 4.2) ---
// 5 tiers per building: ×2 each (×32 total per building)
export const BUILDING_UPGRADES = [
    // Observatory
    { id: 'bldg_observatory_1', buildingId: 'observatory', name: 'Better Mirrors', cost: 150, multiplier: 2, requiredCount: 1, flavorText: "Reflections of reflections of distant light." },
    { id: 'bldg_observatory_2', buildingId: 'observatory', name: 'Adaptive Optics', cost: 1500, multiplier: 2, requiredCount: 5, flavorText: "The atmosphere bends light. You bend it back." },
    { id: 'bldg_observatory_3', buildingId: 'observatory', name: 'Space Telescope Array', cost: 15000, multiplier: 2, requiredCount: 25, flavorText: "No atmosphere. No distortion. Pure seeing." },
    { id: 'bldg_observatory_4', buildingId: 'observatory', name: 'Quantum Lensing', cost: 150000, multiplier: 2, requiredCount: 50, flavorText: "Light observed on a quantum level. Reality noticed." },
    { id: 'bldg_observatory_5', buildingId: 'observatory', name: 'Reality Lens', cost: 1500000, multiplier: 2, requiredCount: 100, flavorText: "You don't observe the universe anymore. The universe observes you. Mutual." },

    // Cosmic Distillery
    { id: 'bldg_distillery_1', buildingId: 'cosmicDistillery', name: 'Upgraded Coils', cost: 1000, multiplier: 2, requiredCount: 1, flavorText: "Better coils. Better plasma containment. Better everything." },
    { id: 'bldg_distillery_2', buildingId: 'cosmicDistillery', name: 'Plasma Filters', cost: 10000, multiplier: 2, requiredCount: 5, flavorText: "Filtering plasma is an art. You've made it a science. Then back to an art." },
    { id: 'bldg_distillery_3', buildingId: 'cosmicDistillery', name: 'Photon Compression', cost: 100000, multiplier: 2, requiredCount: 25, flavorText: "Compressing photons shouldn't be possible. It is now." },
    { id: 'bldg_distillery_4', buildingId: 'cosmicDistillery', name: 'Stellar Condensation', cost: 1000000, multiplier: 2, requiredCount: 50, flavorText: "You condense the output of a star. The star is fine with it. Probably." },
    { id: 'bldg_distillery_5', buildingId: 'cosmicDistillery', name: 'Anti-Matter Still', cost: 10000000, multiplier: 2, requiredCount: 100, flavorText: "The still that produces from the opposite of everything. Philosophy in a machine." },

    // Nebula Farm
    { id: 'bldg_nebulaFarm_1', buildingId: 'nebulaFarm', name: 'Better Rakes', cost: 5000, multiplier: 2, requiredCount: 1, flavorText: "Cloud raking: surprisingly effective." },
    { id: 'bldg_nebulaFarm_2', buildingId: 'nebulaFarm', name: 'Cloud Seeder', cost: 50000, multiplier: 2, requiredCount: 5, flavorText: "You seed clouds that will become stars. Farming, cosmically." },
    { id: 'bldg_nebulaFarm_3', buildingId: 'nebulaFarm', name: 'Protostar Nursery', cost: 500000, multiplier: 2, requiredCount: 25, flavorText: "You're raising baby stars now. The responsibility is real." },
    { id: 'bldg_nebulaFarm_4', buildingId: 'nebulaFarm', name: 'Stellar Incubator', cost: 5000000, multiplier: 2, requiredCount: 50, flavorText: "Stars grow faster under your care. Nature approves reluctantly." },
    { id: 'bldg_nebulaFarm_5', buildingId: 'nebulaFarm', name: 'Galaxy-Scale Harvest', cost: 50000000, multiplier: 2, requiredCount: 100, flavorText: "Your farm spans a galaxy. The yield is everything." },

    // Pulsar Engine
    { id: 'bldg_pulsarEngine_1', buildingId: 'pulsarEngine', name: 'Shock Absorbers', cost: 30000, multiplier: 2, requiredCount: 1, flavorText: "The vibrations are now contained. Mostly." },
    { id: 'bldg_pulsarEngine_2', buildingId: 'pulsarEngine', name: 'Timing Array', cost: 300000, multiplier: 2, requiredCount: 5, flavorText: "Precision timing. The pulsar respects this." },
    { id: 'bldg_pulsarEngine_3', buildingId: 'pulsarEngine', name: 'Neutron Amplifier', cost: 3000000, multiplier: 2, requiredCount: 25, flavorText: "Amplifying neutron star output. The physics are terrifying." },
    { id: 'bldg_pulsarEngine_4', buildingId: 'pulsarEngine', name: 'Rotational Overdrive', cost: 30000000, multiplier: 2, requiredCount: 50, flavorText: "Faster than 716. The textbooks are being revised." },
    { id: 'bldg_pulsarEngine_5', buildingId: 'pulsarEngine', name: 'Millisecond Resonator', cost: 300000000, multiplier: 2, requiredCount: 100, flavorText: "Every millisecond, a resonance. Every resonance, stardust." },

    // Black Hole Tap
    { id: 'bldg_blackHoleTap_1', buildingId: 'blackHoleTap', name: 'Longer Tether', cost: 100000, multiplier: 2, requiredCount: 1, flavorText: "Further from the event horizon. Marginally safer." },
    { id: 'bldg_blackHoleTap_2', buildingId: 'blackHoleTap', name: 'Radiation Collector', cost: 1000000, multiplier: 2, requiredCount: 5, flavorText: "Collecting Hawking radiation. A sentence that shouldn't work but does." },
    { id: 'bldg_blackHoleTap_3', buildingId: 'blackHoleTap', name: 'Ergosphere Scoop', cost: 10000000, multiplier: 2, requiredCount: 25, flavorText: "The ergosphere: where space itself is dragged around. You scoop from it." },
    { id: 'bldg_blackHoleTap_4', buildingId: 'blackHoleTap', name: 'Kerr Metric Tap', cost: 100000000, multiplier: 2, requiredCount: 50, flavorText: "Tapping from rotating black holes. The Kerr metric allows it. Barely." },
    { id: 'bldg_blackHoleTap_5', buildingId: 'blackHoleTap', name: 'Singularity Extract', cost: 1000000000, multiplier: 2, requiredCount: 100, flavorText: "What comes from beyond the event horizon stays... well, it doesn't. Not anymore." },

    // Wormhole Pipeline - using reasonable costs
    { id: 'bldg_wormholePipeline_1', buildingId: 'wormholePipeline', name: 'Stabilization Field', cost: 400000, multiplier: 2, requiredCount: 1, flavorText: "The wormhole holds steady. For now." },
    { id: 'bldg_wormholePipeline_2', buildingId: 'wormholePipeline', name: 'Multi-Thread Pipeline', cost: 4000000, multiplier: 2, requiredCount: 5, flavorText: "Multiple streams through a single wormhole. Efficient and mildly disturbing." },
    { id: 'bldg_wormholePipeline_3', buildingId: 'wormholePipeline', name: 'Exotic Matter Brace', cost: 40000000, multiplier: 2, requiredCount: 25, flavorText: "Exotic matter with negative energy density. Holds the throat open. Don't ask." },
    { id: 'bldg_wormholePipeline_4', buildingId: 'wormholePipeline', name: 'Spacetime Router', cost: 400000000, multiplier: 2, requiredCount: 50, flavorText: "Routing through spacetime like packets through a network. The universe is the internet now." },
    { id: 'bldg_wormholePipeline_5', buildingId: 'wormholePipeline', name: 'Einstein-Rosen Bridge', cost: 4000000000, multiplier: 2, requiredCount: 100, flavorText: "The full bridge. Permanent. Beautiful. Slightly illegal in three dimensions." },

    // Dyson Swarm
    { id: 'bldg_dysonSwarm_1', buildingId: 'dysonSwarm', name: 'Orbital Optimization', cost: 2000000, multiplier: 2, requiredCount: 1, flavorText: "Better orbits. More coverage. The star barely notices." },
    { id: 'bldg_dysonSwarm_2', buildingId: 'dysonSwarm', name: 'Solar Harvester Array', cost: 20000000, multiplier: 2, requiredCount: 5, flavorText: "Five swarms, perfectly synchronized. The stars are surrounded." },
    { id: 'bldg_dysonSwarm_3', buildingId: 'dysonSwarm', name: 'Stellar Enclosure', cost: 200000000, multiplier: 2, requiredCount: 25, flavorText: "The swarm is becoming a shell. Freeman Dyson nods approvingly from beyond." },
    { id: 'bldg_dysonSwarm_4', buildingId: 'dysonSwarm', name: 'Matrioshka Brain', cost: 2000000000, multiplier: 2, requiredCount: 50, flavorText: "Nested Dyson spheres. Each layer computing, each layer brewing." },
    { id: 'bldg_dysonSwarm_5', buildingId: 'dysonSwarm', name: 'Stellar Engine', cost: 20000000000, multiplier: 2, requiredCount: 100, flavorText: "The star moves now. You tell it where to go. It complies." },

    // Galactic Brewery
    { id: 'bldg_galacticBrewery_1', buildingId: 'galacticBrewery', name: 'Planetary Assembly', cost: 15000000, multiplier: 2, requiredCount: 1, flavorText: "Assembly lines across planets. The logistics are staggering." },
    { id: 'bldg_galacticBrewery_2', buildingId: 'galacticBrewery', name: 'System-Wide Integration', cost: 150000000, multiplier: 2, requiredCount: 5, flavorText: "Every planet in the system works for the brewery now. Even the gas giants help." },
    { id: 'bldg_galacticBrewery_3', buildingId: 'galacticBrewery', name: 'Stellar Forge Network', cost: 1500000000, multiplier: 2, requiredCount: 25, flavorText: "Stars forge your ingredients directly. Custom orders accepted." },
    { id: 'bldg_galacticBrewery_4', buildingId: 'galacticBrewery', name: 'Galactic Supply Chain', cost: 15000000000, multiplier: 2, requiredCount: 50, flavorText: "The supply chain crosses spiral arms. Delivery time: instantaneous. Somehow." },
    { id: 'bldg_galacticBrewery_5', buildingId: 'galacticBrewery', name: 'Cosmic Franchise', cost: 150000000000, multiplier: 2, requiredCount: 100, flavorText: "Every galaxy has one now. Or will. Franchise fees are reasonable." },

    // Dark Matter Siphon
    { id: 'bldg_darkMatterSiphon_1', buildingId: 'darkMatterSiphon', name: 'Detection Array', cost: 100000000, multiplier: 2, requiredCount: 1, flavorText: "You can't see it. But you can collect it. Science has evolved past visibility." },
    { id: 'bldg_darkMatterSiphon_2', buildingId: 'darkMatterSiphon', name: 'Gravitational Lens Amplifier', cost: 1000000000, multiplier: 2, requiredCount: 5, flavorText: "Gravity bends light. You bend gravity. The rest follows." },
    { id: 'bldg_darkMatterSiphon_3', buildingId: 'darkMatterSiphon', name: 'Dark Sector Probe', cost: 10000000000, multiplier: 2, requiredCount: 25, flavorText: "Probing the dark sector. What you find there is... present." },
    { id: 'bldg_darkMatterSiphon_4', buildingId: 'darkMatterSiphon', name: 'Halo Extractor', cost: 100000000000, multiplier: 2, requiredCount: 50, flavorText: "Dark matter halos surround every galaxy. You extract from the halo. The galaxy weighs less." },
    { id: 'bldg_darkMatterSiphon_5', buildingId: 'darkMatterSiphon', name: 'Non-Baryonic Engine', cost: 1000000000000, multiplier: 2, requiredCount: 100, flavorText: "An engine powered by what shouldn't exist. It runs perfectly." },

    // Multiverse Tap
    { id: 'bldg_multiverseTap_1', buildingId: 'multiverseTap', name: 'Quantum Tunneler', cost: 750000000, multiplier: 2, requiredCount: 1, flavorText: "Tunneling between realities. The probabilities are in your favor. Barely." },
    { id: 'bldg_multiverseTap_2', buildingId: 'multiverseTap', name: 'Parallel Siphon', cost: 7500000000, multiplier: 2, requiredCount: 5, flavorText: "Five taps into five universes. None of them have filed complaints. Yet." },
    { id: 'bldg_multiverseTap_3', buildingId: 'multiverseTap', name: 'Branching Thread Weaver', cost: 75000000000, multiplier: 2, requiredCount: 25, flavorText: "Weaving between branches of the multiverse. Each thread a different everything." },
    { id: 'bldg_multiverseTap_4', buildingId: 'multiverseTap', name: 'Reality Stack', cost: 750000000000, multiplier: 2, requiredCount: 50, flavorText: "Stacking realities like pancakes. Each one slightly different. All productive." },
    { id: 'bldg_multiverseTap_5', buildingId: 'multiverseTap', name: 'Infinite Extraction', cost: 7500000000000, multiplier: 2, requiredCount: 100, flavorText: "Drawing from infinity. The math stopped working. The production didn't." },
];

// --- Global Production Upgrades (GDD 4.3) ---
export const GLOBAL_UPGRADES = [
    {
        id: 'global_stellarSynergy',
        name: 'Stellar Synergy',
        cost: 5000,
        effect: { type: 'allProduction', value: 1.10 },
        unlockCondition: (state) => state.totalEarned >= 1000,
        flavorText: "Turns out, things work better together. Revolutionary.",
    },
    {
        id: 'global_cosmicResonance',
        name: 'Cosmic Resonance',
        cost: 25000,
        effect: { type: 'allProduction', value: 1.25 },
        unlockCondition: (state) => state.totalEarned >= 10000,
        flavorText: "The universe hums at a frequency. You matched it. By accident.",
    },
    {
        id: 'global_darkEnergyBoost',
        name: 'Dark Energy Boost',
        cost: 200000,
        effect: { type: 'allProduction', value: 1.50 },
        unlockCondition: (state) => state.totalEarned >= 100000,
        flavorText: "Dark energy accelerates the universe's expansion. You've redirected some of it. Cosmologists are writing papers.",
    },
    {
        id: 'global_quantumEntanglement',
        name: 'Quantum Entanglement Network',
        cost: 2000000,
        effect: { type: 'allProduction', value: 2.0 },
        unlockCondition: (state) => state.totalEarned >= 1000000,
        flavorText: "Every brewery entangled with every other. Touch one, affect all. Don't think too hard about it.",
    },
    {
        id: 'global_spacetimeEfficiency',
        name: 'Spacetime Efficiency',
        cost: 20000000,
        effect: { type: 'allProduction', value: 3.0 },
        unlockCondition: (state) => state.totalEarned >= 10000000,
        flavorText: "You've bent spacetime slightly to make production faster. Einstein would be proud. Probably. He wasn't a fun person.",
    },
    {
        id: 'global_universalConstants',
        name: 'Universal Constants Update',
        cost: 200000000,
        effect: { type: 'allProduction', value: 5.0 },
        unlockCondition: (state) => state.totalEarned >= 100000000,
        flavorText: "You've filed a formal request with the universe to update its production constants. Request approved.",
    },
    {
        id: 'global_cosmicStringLoom',
        name: 'Cosmic String Loom',
        cost: 2000000000,
        effect: { type: 'allProduction', value: 10.0 },
        unlockCondition: (state) => state.totalEarned >= 1000000000,
        flavorText: "Weaves the fabric of spacetime. Mostly for efficiency. A little for napkins.",
    },
];

// --- Space Technology Upgrades (GDD 4.4) ---
export const SPACE_TECH_UPGRADES = [
    {
        id: 'tech_ionThruster',
        name: 'Ion Thruster',
        cost: 5000,
        effect: { type: 'explorationSpeed', value: 1.25 },
        unlockCondition: (state) => state.spacecraft.length >= 1,
        flavorText: "Real ion thrusters (like on NASA's Dawn spacecraft) use electric fields to accelerate ions - far more efficient than chemical rockets, just slower to accelerate.",
    },
    {
        id: 'tech_solarSail',
        name: 'Solar Sail',
        cost: 15000,
        effect: { type: 'passiveProduction', value: 1.10 },
        unlockCondition: (state) => state.spacecraft.length >= 1,
        flavorText: "Solar sails use radiation pressure from sunlight. JAXA's IKAROS was the first successful interplanetary solar sail in 2010.",
    },
    {
        id: 'tech_gravityAssist',
        name: 'Gravity Assist',
        cost: 30000,
        effect: { type: 'spacecraftDiscount', value: 0.60 },
        unlockCondition: (state) => state.spacecraft.length >= 2,
        flavorText: "Gravity assists (slingshot maneuvers) use a planet's gravity to accelerate spacecraft. Voyager used Jupiter and Saturn to reach interstellar space.",
    },
    {
        id: 'tech_nuclearPulse',
        name: 'Nuclear Pulse Drive',
        cost: 100000,
        effect: { type: 'allZoneBonus', value: 2.0 },
        unlockCondition: (state) => state.spacecraft.length >= 2,
        flavorText: "Project Orion (1950s-60s) proposed detonating nuclear bombs behind a spacecraft for propulsion. Technically worked. Politically complicated.",
    },
    {
        id: 'tech_warpPrototype',
        name: 'Warp Drive Prototype',
        cost: 500000,
        effect: { type: 'unlockZones', value: 2 },
        unlockCondition: (state) => state.spacecraft.length >= 3,
        flavorText: "The Alcubierre metric (1994) describes a theoretical warp drive that contracts space ahead and expands it behind. No known energy source could power it.",
    },
    {
        id: 'tech_quantumNav',
        name: 'Quantum Navigation',
        cost: 1000000,
        effect: { type: 'allZoneBonus', value: 1.15 },
        unlockCondition: (state) => state.spacecraft.length >= 4,
        flavorText: "Quantum navigation using entangled particles could theoretically allow GPS-independent positioning. Research is ongoing at MIT and ESA.",
    },
    {
        id: 'tech_dysonTheory',
        name: 'Dyson Sphere Theory',
        cost: 5000000,
        effect: { type: 'buildingMultiplier', buildingId: 'dysonSwarm', value: 3.0 },
        unlockCondition: (state) => state.spacecraft.length >= 5,
        flavorText: "A full Dyson Sphere is likely impossible - a swarm of satellites is more feasible. Physicist Freeman Dyson proposed this in 1960.",
    },
    {
        id: 'tech_answerEngine',
        name: 'The Answer Engine',
        cost: 50000000,
        effect: { type: 'revealUpgrade', value: 'hidden_42' },
        unlockCondition: (state) => state.spacecraft.length >= 6,
        flavorText: "42. It was 42 all along. You knew this. Why did you ask?",
    },
    {
        id: 'tech_interstellarBeacon',
        name: 'Interstellar Beacon',
        cost: 25000000,
        effect: { type: 'passiveClick', value: 1.0 },
        unlockCondition: (state) => state.zones.proximaCentauri?.visited,
        flavorText: "Once activated, it broadcasts your arrival. Shortly after, The Last Signal responds. Automation accelerates.",
    },
    {
        id: 'tech_multiPlanetNetwork',
        name: 'Multi-Planet Network',
        cost: 100000000,
        effect: { type: 'unlockTrappistPlanets', value: 7 },
        unlockCondition: (state) => state.zones.trappist1?.visited,
        flavorText: "Establishes a unified data grid across the entire TRAPPIST-1 system, revealing all seven rocky planets simultaneously.",
    },
];

/**
 * Get all upgrades as a flat array
 */
export function getAllUpgrades() {
    return [...CLICK_UPGRADES, ...BUILDING_UPGRADES, ...GLOBAL_UPGRADES, ...SPACE_TECH_UPGRADES];
}

/**
 * Get upgrade by ID
 */
export function getUpgrade(id) {
    return getAllUpgrades().find(u => u.id === id);
}
