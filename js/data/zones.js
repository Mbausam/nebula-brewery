/**
 * Nebula Brewery — Exploration Zones Data
 * Zones 1-8 for v1.0 (Earth Orbit → Oort Cloud) from GDD Section 5.3.
 * Zones 9-14 deferred to v1.5.
 */

export const ZONES = [
    {
        id: 'earthOrbit',
        name: 'Earth Orbit',
        order: 1,
        unlockCondition: (state) => state.spacecraft.includes('starHopper'),
        discoveryText: "You're in orbit. 250 miles up. The International Space Station passes by. The astronauts wave. They look tired. You send them a case of Star Ale. You are now best friends.",
        realFacts: [
            "The ISS travels at 17,500 mph, orbiting Earth every 90 minutes. Astronauts see 16 sunrises and sunsets per day. That's 16 separate existential moments. Before breakfast.",
            "There's no gravity in orbit - technically it's microgravity. Astronauts aren't weightless because gravity stopped. They're weightless because they're constantly falling sideways fast enough to miss the Earth.",
            "Your Star Ale would float in perfect spheres in microgravity. Fancy serving. No cups needed. The ISS crew is intrigued but the no-alcohol policy remains. For now.",
        ],
        ingredient: { name: 'Zero-G Stardust', effect: 'allProduction', value: 1.05, description: 'All production +5%' },
        upgradeUnlock: { name: 'Satellite Network', effect: 'autoCollect', description: 'Auto-collection from all owned zones' },
    },
    {
        id: 'moon',
        name: 'The Moon',
        order: 2,
        unlockCondition: (state) => state.zones.earthOrbit?.visited && state.totalEarned >= 5000,
        discoveryText: "You land in the Sea of Tranquility. It's quiet. Very quiet. You plant a small brewery flag. Neil Armstrong's footprint is 50 feet away. You do not step on it. Respect.",
        realFacts: [
            "The Moon is moving away from Earth at 3.8 centimeters per year. Eventually, total solar eclipses will be geometrically impossible. Enjoy them. They're finite.",
            "Moon dust (regolith) is incredibly sharp - it hasn't been weathered by wind or water, so every grain is a tiny glass shard. Apollo astronauts had it tear through suits. Your brewery equipment now has special filters.",
            "One day on the Moon is 29.5 Earth days. Your patrons are very patient. Or they brought a lot of reading material.",
        ],
        ingredient: { name: 'Lunar Regolith Crystals', effect: 'tipIncome', value: 1.10, description: 'Tip income +10%' },
        upgradeUnlock: { name: 'Lunar Base', effect: 'passiveMoon', description: 'Permanent passive Moon production' },
    },
    {
        id: 'mars',
        name: 'Mars',
        order: 3,
        unlockCondition: (state) => state.spacecraft.includes('novaWing'),
        discoveryText: "Olympus Mons towers above you - three times the height of Everest. You consider climbing it. Then you remember you have a brewery to run. Priorities.",
        realFacts: [
            "Olympus Mons is the tallest volcano in the solar system - 13.6 miles high and wide enough to cover all of France. If you stood at its base, you couldn't see the summit; the curve of Mars would hide it.",
            "Mars has the largest dust storms in the solar system, sometimes covering the entire planet for months. The Mars rover Opportunity was killed by one in 2018. NASA's last signal from it was the equivalent of a distress call. We still feel this.",
            "A Martian day (sol) is 24 hours and 37 minutes - almost Earth-like. NASA engineers on Mars missions slowly drift out of sync with Earth time as they follow rover schedules. Many described it as peaceful.",
        ],
        ingredient: { name: 'Iron Oxide Essence', effect: 'allProduction', value: 1.10, description: 'All production +10%' },
        upgradeUnlock: { name: 'Martian Greenhouse', effect: 'passiveMars', description: 'Grows special exotic ingredients passively' },
    },
    {
        id: 'asteroidBelt',
        name: 'Asteroid Belt',
        order: 4,
        unlockCondition: (state) => state.zones.mars?.visited && state.totalEarned >= 50000,
        discoveryText: "Between Mars and Jupiter, you find millions of rocks. One of them is worth more than Earth's entire economy. You take a small piece. For the brewery. Obviously.",
        realFacts: [
            "The asteroid belt contains enough material to make a planet roughly twice the size of Earth - but Jupiter's immense gravity has always prevented accretion. It is a planet that never happened.",
            "Ceres - the largest object in the asteroid belt, large enough to be a dwarf planet - may contain more fresh water than all of Earth combined, locked in ice beneath its surface.",
            "The asteroid 16 Psyche is estimated to contain $10 quintillion worth of iron and nickel. NASA launched a mission to study it in 2023. The global economy is worth approximately $100 trillion. Do the math.",
        ],
        ingredient: { name: 'Metallic Core Fragment', effect: 'allProduction', value: 1.15, description: 'All production +15%' },
        upgradeUnlock: { name: 'Asteroid Mining Rig', effect: 'passiveMinerals', description: 'Passive mineral income per second' },
    },
    {
        id: 'jupiter',
        name: 'Jupiter & The Great Red Spot',
        order: 5,
        unlockCondition: (state) => state.spacecraft.includes('voidGlider'),
        discoveryText: "You approach Jupiter. It's big. Really big. You feel very small. The Great Red Spot stares at you like an eye. You wave. It does not wave back. Rude.",
        realFacts: [
            "The Great Red Spot is an anticyclonic storm with winds up to 400 mph that has been raging for at least 350-400 years. It is wider than Earth. Scientists don't fully understand why it hasn't dissipated.",
            "Jupiter has 95 confirmed moons as of 2023 - more than any other planet. Europa, one of them, has a liquid water ocean beneath its icy surface and is considered one of the best candidates for extraterrestrial life in our solar system.",
            "Jupiter acts as a cosmic shield - its immense gravity deflects or captures comets and asteroids that would otherwise travel toward the inner solar system. Earth owes Jupiter several extinction events it never had.",
        ],
        ingredient: { name: 'Jovian Atmosphere Extract', effect: 'allProduction', value: 1.25, description: 'All production +25%' },
        upgradeUnlock: { name: 'Moon Network', effect: 'moonMultiplier', description: 'Production multiplier per moon discovered' },
    },
    {
        id: 'saturn',
        name: "Saturn's Rings",
        order: 6,
        unlockCondition: (state) => state.zones.jupiter?.visited && state.totalEarned >= 250000,
        discoveryText: "You fly through Saturn's rings. Ice particles ping off your hull. It sounds like rain. Beautiful, deadly, frozen rain. You collect some for cocktails. Obviously.",
        realFacts: [
            "Saturn's rings are 99% water ice, ranging from dust-sized grains to chunks the size of a house. They extend up to 282,000 km from Saturn - almost the distance from Earth to the Moon.",
            "Despite their enormous width, Saturn's rings are only about 10-30 meters thick on average - paper-thin by astronomical standards. If shrunk to the scale of a piece of paper, the paper would be wider than a football field.",
            "Saturn is slowly consuming its own rings. Ring material rains down into Saturn's atmosphere at a rate of 10,000 kg per second. The rings may disappear within 100 million years - cosmically soon.",
        ],
        ingredient: { name: 'Ring Ice Crystals', effect: 'tipIncome', value: 1.25, description: 'Tip income +25%' },
        upgradeUnlock: { name: 'Ice Mining Station', effect: 'passiveWater', description: 'Passive water income, unlocks new cocktail recipes' },
    },
    {
        id: 'pluto',
        name: 'Pluto & The Kuiper Belt',
        order: 7,
        unlockCondition: (state) => state.spacecraft.includes('nebulaCruiser'),
        discoveryText: "Pluto. Still a planet in your heart. You leave a bottle of Star Ale on its surface. A memorial. For what was lost. For what remains.",
        realFacts: [
            "Pluto has a heart-shaped glacier on its surface called Tombaugh Regio, made of nitrogen ice. When New Horizons photographed it in 2015, it broke the internet. A heart. On Pluto. Science gave us a gift.",
            "Pluto takes 248 Earth years to orbit the Sun. Since its discovery in 1930, it has not yet completed a full orbit. It never will in any human lifetime. This feels appropriate for something we demoted.",
            "The Kuiper Belt extends from Neptune's orbit to about 50 AU from the Sun and contains thousands of icy bodies - remnants from the solar system's early formation, preserved in deep freeze for 4.5 billion years.",
        ],
        ingredient: { name: 'Frozen Heart Essence', effect: 'allProduction', value: 1.30, description: 'All production +30%' },
        upgradeUnlock: { name: 'Kuiper Outpost', effect: 'extremeRange', description: 'Enables extreme-range zone exploration' },
    },
    {
        id: 'oortCloud',
        name: 'The Oort Cloud',
        order: 8,
        unlockCondition: (state) => state.zones.pluto?.visited && state.totalEarned >= 1000000,
        discoveryText: "You've reached the edge of the solar system. The Sun is a distant dot. The cold is absolute. Something watches from the darkness. You pour a drink - for them, for you, for all of us.",
        realFacts: [
            "The Oort Cloud is a theoretical spherical shell of icy bodies surrounding our solar system, extending up to 3.2 light-years from the Sun - halfway to Proxima Centauri. We have never directly observed it. We infer it exists because comets come from somewhere.",
            "Long-period comets like Hale-Bopp originate in the Oort Cloud. Hale-Bopp's last orbit took approximately 4,200 years. Its next visit is estimated around the year 4385. If you see it, remember us.",
            "Voyager 1, the farthest human-made object ever, is currently about 0.002 light-years from Earth. At its current speed, it will enter the Oort Cloud in approximately 300 years. It will take 30,000 years to pass through it.",
        ],
        ingredient: { name: 'Primordial Ice', effect: 'allProduction', value: 1.50, description: 'All production +50%' },
        upgradeUnlock: { name: 'Oort Cloud Beacon', effect: 'prestigeBonus', value: 1.10, description: 'Prestige bonus +10%' },
    },
    {
        id: 'proximaCentauri',
        name: 'Proxima Centauri',
        order: 9,
        unlockCondition: (state) => state.spacecraft.includes('eventHorizon') && state.totalEarned >= 5000000,
        discoveryText: "You've traveled 4.24 light-years. The first star outside our solar system. A red dwarf. It's smaller than the sun, but it's here. You leave a bottle of Star Ale to mark the occasion. No one drinks it. Yet.",
        realFacts: [
            "Proxima Centauri is a red dwarf star, about 1/7th the diameter of the Sun. Despite being the closest star to our solar system, it's too dim to be seen with the naked eye from Earth.",
            "It occasionally releases massive solar flares that can increase its brightness dramatically. These flares would make habitability on its planets extremely challenging.",
            "In 2016, an Earth-sized planet, Proxima Centauri b, was discovered orbiting in its habitable zone. Whether it has an atmosphere remains an open question."
        ],
        ingredient: { name: 'Red Dwarf Embers', effect: 'allProduction', value: 2.00, description: 'All production +100%' },
        upgradeUnlock: { name: 'Interstellar Beacon', effect: 'passiveClick', description: 'Unlocks The Last Signal patron and automation' },
    },
    {
        id: 'trappist1',
        name: 'TRAPPIST-1',
        order: 10,
        unlockCondition: (state) => state.zones.proximaCentauri?.visited && state.totalEarned >= 25000000,
        discoveryText: "Thirty-nine light years from Earth. A single ultra-cool red dwarf star surrounded by seven rocky planets. A perfectly packed system. It feels... designed. You start the brewing processors.",
        realFacts: [
            "The TRAPPIST-1 star is only slightly larger than Jupiter. If our Sun were the size of a basketball, TRAPPIST-1 would be a golf ball.",
            "All seven known planets in the system are roughly Earth-sized and terrestrial. This is the largest group of such planets ever found around a single star.",
            "The planets are packed incredibly close together. From the surface of one, the others would appear larger than the Moon does from Earth, moving visibly across the sky."
        ],
        ingredient: { name: 'Seven-Star Essence Base', effect: 'clickValue', value: 5.00, description: 'Click value +400%' },
        upgradeUnlock: { name: 'Multi-Planet Network', effect: 'unlockTrappistPlanets', description: 'Allows exploration of all 7 inner planets' },
    },
    {
        id: 'trappist1b',
        name: 'TRAPPIST-1b (The Furnace)',
        order: 11,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "The closest planet to the star. Scorching. A year here is 1.5 Earth days. You can watch it orbit in real time if you squint. You do not want to live here. You set up a heat-resistant stardust collector. It runs hot. It runs constantly.",
        realFacts: [
            "TRAPPIST-1b completes one orbit in just 1.51 days. Despite being close to a much cooler star than the Sun, its proximity makes it likely far too hot for liquid water. Modelling suggests temperatures around 230°C on the day side.",
            "The star it orbits - TRAPPIST-1 - is an ultra-cool red dwarf, only slightly larger than Jupiter. From the surface of 1b, the star would appear roughly 3 times the size of our Moon in the sky. Red and enormous and close."
        ],
        ingredient: { name: 'Furnace Dust', effect: 'allProduction', value: 1.05, description: '+5% all production (permanently stacks)' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1c',
        name: 'TRAPPIST-1c (The Mirror)',
        order: 12,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "Highly reflective. A rocky planet with a thick, bright atmosphere. Maybe Venus-like. Maybe something else entirely. The light that bounces off it reaches your instruments looking like a question. You collect it. Questions are a kind of ingredient.",
        realFacts: [
            "TRAPPIST-1c orbits in 2.42 days. Recent James Webb Space Telescope data suggests it likely has little to no thick atmosphere - it appears to be a bare rock or thin atmosphere world, despite being in a position where a Venus-like scenario was possible.",
            "Data from JWST measuring 1c's thermal emission gave scientists their first real look at a TRAPPIST planet's surface conditions. The answer was surprising and slightly deflating. Science often works this way - ruling things out is still progress."
        ],
        ingredient: { name: 'Mirror-Light Residue', effect: 'upgradeCost', value: 0.97, description: 'All upgrade costs -3%' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1d',
        name: 'TRAPPIST-1d (The Whisper)',
        order: 13,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "The smallest of the seven. A year is 4 Earth days. It sits at the inner edge of the habitable zone - probably too warm, but possibly, conceivably, with the right conditions... you stand at the inner edge and look inward and outward at the same time. Some thresholds feel significant.",
        realFacts: [
            "TRAPPIST-1d is the smallest planet in the system and orbits in 4.05 days. It sits at the inner edge of the conservative habitable zone. Whether liquid water could persist on its surface depends on atmospheric factors we don't yet fully understand.",
            "TRAPPIST-1d is tidally locked - one face always toward the star, one in permanent darkness. The terminator line between them - the strip of eternal twilight - is considered by some scientists to be the most likely location for any life that might exist there."
        ],
        ingredient: { name: 'Twilight Essence', effect: 'clickValue', value: 1.15, description: 'Click value +15%' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1e',
        name: 'TRAPPIST-1e (The Hope)',
        order: 14,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork') && state.zones.trappist1d?.visited,
        discoveryText: "The one they talk about. The crown jewel. The most Earth-like in terms of energy received from its star. You land and stand in what might be - might be - a breeze. It might be atmospheric circulation. It might be wind. You stand in it anyway. For a moment. Before setting up the brewery.",
        realFacts: [
            "TRAPPIST-1e is considered the most Earth-like of the seven in terms of receiving a similar amount of stellar energy as Earth receives from the Sun. It orbits in 6.1 days and is in the middle of the habitable zone.",
            "In a 2018 study ranking the habitability potential of known exoplanets, TRAPPIST-1e ranked highest of all. It is the planet most often cited when scientists discuss where to look first for signs of life beyond our solar system. It is 39 light-years away. It is the most hopeful address in the universe.",
            "\"If there is life in the TRAPPIST-1 system, it is most likely here.\" - almost every astrobiologist, 2017-present. No life has been confirmed. The question is still open. The question is beautiful precisely because it is still open."
        ],
        ingredient: { name: 'Hope Crystal', effect: 'allProduction', value: 1.5, description: 'All production x1.5' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1f',
        name: 'TRAPPIST-1f (The Ice Keeper)',
        order: 15,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "Further out, cooler, possibly frozen at the surface. But oceans can exist under ice - Europa taught us that. You drill carefully. You find something. Cold, dark, deep. Old. Whatever is here has been here a very long time, in the dark, unbothered.",
        realFacts: [
            "TRAPPIST-1f orbits in 9.21 days and is in the outer part of the habitable zone. Its surface is likely cold, potentially icy, but subsurface liquid water remains possible - particularly if tidal heating from the gravitational interactions with other planets provides additional warmth.",
            "The TRAPPIST-1 planets interact gravitationally with each other in complex orbital resonances - each planet's year is related to its neighbors' by simple ratios. This resonance pumps tidal energy into the planets, potentially keeping their interiors warm long past what their star alone would allow."
        ],
        ingredient: { name: 'Ancient Ice Core', effect: 'offlineCap', value: 12, description: 'Offline production cap raised to 12 hours' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1g',
        name: 'TRAPPIST-1g (The Sentinel)',
        order: 16,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "The second largest planet in the system. Far out. Cool. If you stand here and look toward the star, you can see the other planets crossing its face - silhouettes of six worlds in a row, like a cosmic clock displaying a time nobody designed. Nature's orrery.",
        realFacts: [
            "TRAPPIST-1g is the largest planet in the system and orbits in 12.35 days. Being near the outer habitable zone boundary, liquid water would require significant greenhouse warming to be stable at its surface.",
            "From the surface of any TRAPPIST-1 planet, you could watch the other planets transit their star with the naked eye - bright enough to see. The planets would also appear large and distinct in the sky. Living in that system would mean the sky is always full of neighbors."
        ],
        ingredient: { name: 'Sentinel Stone', effect: 'spacecraftDiscount', value: 0.8, description: 'Future spacecrafts cost 20% less' },
        upgradeUnlock: null,
    },
    {
        id: 'trappist1h',
        name: 'TRAPPIST-1h (The Quiet One)',
        order: 17,
        unlockCondition: (state) => state.upgrades.includes('tech_multiPlanetNetwork'),
        discoveryText: "The farthest out. A year is 18.77 days. The star is dim here - a red ember in a dark sky. Very cold. Very still. You are the only thing here that is warm. You pour a drink and let the steam rise. It rises straight up in the still air. There is no wind. There has never been wind here. There is now. Briefly.",
        realFacts: [
            "TRAPPIST-1h is the outermost planet, orbiting in 18.77 days. It is almost certainly too cold for liquid water without extraordinary greenhouse effects. It exists at the edge of what we might call the system's possibility space.",
            "The TRAPPIST-1 system was discovered using the transit method - detecting the tiny dimming of the star's light as each planet passed in front of it. Seven planets were found this way, one by one, each passage a tiny shadow, each shadow a world.",
            "TRAPPIST-1h may be the coldest of the seven, but it completes the system. Seven worlds around one small red star, 39 light-years away. When the Hubble Space Telescope launched in 1990, we knew of no planets outside our solar system. TRAPPIST-1 was discovered 27 years later. Science moves fast when it moves."
        ],
        ingredient: { name: 'The Final Ingredient', effect: 'allProduction', value: 2.0, description: 'All production x2.0' },
        upgradeUnlock: null,
    }
];

export function getZone(id) {
    return ZONES.find(z => z.id === id);
}

export function getZonesSorted() {
    return [...ZONES].sort((a, b) => a.order - b.order);
}
