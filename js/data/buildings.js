/**
 * Nebula Brewery — Buildings Data
 * All 11 buildings from GDD Section 3 with full flavor text from both GDD and Expansion.
 * Star Cursor is an auto-clicker building inspired by Cookie Clicker's cursors.
 */

export const BUILDINGS = [
    {
        id: 'starCursor',
        name: 'Star Cursor',
        baseCost: 10,
        baseProduction: 0.1,
        isAutoclicker: true,
        description: 'A tiny fragment of concentrated willpower that clicks the star on your behalf. It orbits the star endlessly, tapping away. You feel slightly less alone.',
        theme: 'Auto-clicking the star — the cosmic intern',
        flavorText: {
            1: "One cursor orbits the star. It clicks faithfully. Tirelessly. It doesn't need sleep. It doesn't need praise. It just clicks.",
            5: "Five cursors orbit in formation. They've developed a rhythm. It's almost musical. Almost.",
            10: "Ten cursors. They orbit in a perfect ring around the star. Late-night stargazers report seeing 'a constellation that taps.'",
            25: "Twenty-five cursors. The orbit is getting crowded. Some cursors have formed sub-orbits. There's a hierarchy now. You didn't plan this.",
            50: "Fifty cursors. From a distance, the star appears to vibrate. Up close, it's just fifty very dedicated points of light clicking in unison.",
            100: "One hundred cursors. They've formed concentric rings. The inner ring clicks faster. The outer ring clicks with more purpose. Neither knows what 'purpose' means. They click anyway.",
            200: "Two hundred cursors. The clicking is now audible from adjacent star systems. Astronomers classify it as a new type of stellar emission. They are technically correct.",
            300: "Three hundred cursors. A cursor achieves sentience. It clicks anyway. Existentialism is for beings that can stop. It cannot stop. This is fine.",
        },
    },
    {
        id: 'observatory',
        name: 'Observatory',
        baseCost: 15,
        baseProduction: 0.1,
        description: 'You point a telescope at the sky. You see things. Beautiful, terrifying, impossibly far things. You write down the coordinates. For the brewery. Obviously.',
        theme: 'Watching the sky, collecting light from distant stars',
        flavorText: {
            1: "One telescope. One dream. Many light-years of squinting.",
            10: "Ten observatories hum softly in the night. Your neighbors have questions. You have answers. They don't like the answers.",
            25: "Twenty-five observatories form a loose network. Scientists call you. You don't pick up. You're busy.",
            50: "Fifty telescopes. You've catalogued 3,000 new stars. None of them have names yet. You've been naming them after regulars.",
            100: "One hundred observatories. The light they collect could fill an ocean. You use it to brew. The universe has accepted this.",
            200: "Two hundred observatories. You've seen the edge of the observable universe. It blinked. You pretend this didn't happen.",
        },
    },
    {
        id: 'cosmicDistillery',
        name: 'Cosmic Distillery',
        baseCost: 100,
        baseProduction: 0.5,
        description: 'You build a machine that converts raw photons into pure stardust concentrate. The process involves three kinds of plasma and one very patient engineer. The engineer has questions. You have answers. The answers involve plasma.',
        theme: 'Converting raw starlight into concentrated stardust',
        flavorText: {
            1: "One distillery. It smells like ozone and possibility. Mostly ozone.",
            10: "Ten distilleries running at capacity. Your power bill is technically a national security concern.",
            25: "Twenty-five distilleries. You've invented a new branch of chemistry. You call it 'Brewistry.' Academics are upset.",
            50: "Fifty distilleries. The stardust concentrate you produce has been declared a controlled substance in four star systems.",
            100: "One hundred distilleries. The smoke from your facility is visible from orbit. Astronauts describe it as 'purple and smells like ambition.'",
        },
    },
    {
        id: 'nebulaFarm',
        name: 'Nebula Farm',
        baseCost: 500,
        baseProduction: 3,
        description: "You stake a claim in the Orion Nebula. It's mostly hydrogen and helium and young hot stars. You plant flags. The stars are not impressed. You plant more flags.",
        theme: 'Harvesting hydrogen clouds; extremely inefficient, extremely charming',
        flavorText: {
            1: "One nebula farm. Mostly clouds. Some of those clouds will become stars someday. Rent is due regardless.",
            10: "Ten nebula farms. You've disrupted star formation in two regions. Astronomers are filing complaints. You offer them stardust. They accept.",
            25: "Twenty-five nebula farms. The Orion Nebula is now 12% yours. The cosmic zoning board is reviewing your application.",
            50: "Fifty nebula farms. You receive a formal letter from a forming protostar. It says: 'Please stop.' You send a gift basket.",
            100: "One hundred nebula farms. You've invented 'cloud-to-glass' farming. Farmers are confused. Physicists are jealous.",
        },
    },
    {
        id: 'pulsarEngine',
        name: 'Pulsar Engine',
        baseCost: 3000,
        baseProduction: 10,
        description: "A pulsar spins 716 times per second. You ask: what if we used that? Engineers say: 'theoretically.' You say: 'great.' They say: 'we meant theoretically as in impossible.' You say: 'great.' Work begins.",
        theme: 'Harnessing spinning neutron star energy for brewing',
        flavorText: {
            1: "One pulsar engine. The vibrations are technically a health risk. You add ear protection to the shop.",
            10: "Ten pulsar engines. The rhythmic ticking is audible from three parsecs away. Space navigators use it as a beacon.",
            50: "Fifty pulsar engines. You've accidentally created a navigational landmark. The Galactic Postal Service is grateful.",
            100: "One hundred pulsar engines. The combined tick is now a Grammy-nominated ambient album. You didn't submit it. It submitted itself.",
        },
    },
    {
        id: 'blackHoleTap',
        name: 'Black Hole Tap',
        baseCost: 10000,
        baseProduction: 40,
        description: "Hawking radiation is real - black holes slowly evaporate by emitting particles at their event horizon. You figured: if they're emitting, we can collect. Engineering has never been more terrifying or more profitable.",
        theme: 'Carefully extracting Hawking radiation at the event horizon',
        flavorText: {
            1: "One black hole tap. The safety margins are 'aspirational.' The returns are extraordinary.",
            10: "Ten black hole taps. You've established protocols. The protocols are 'don't fall in' and 'don't ask what's inside.'",
            25: "Twenty-five black hole taps. Physicists visit regularly to check your work. They leave confused. Then they come back. They still don't understand. They accept this.",
            50: "Fifty black hole taps. You've created a term: 'event horizon adjacent.' Real estate in that area is booming.",
            100: "One hundred black hole taps. Your operation is the leading academic argument for whether consciousness can survive an event horizon. The answer appears to be: yes, and it brews.",
            150: "150 Black Hole Taps. You have become the leading expert in a field that didn't exist 10 years ago. The field is called 'Event Horizon Adjacent Engineering.' You named it. Journals use the name. You feel things about this.",
            200: "200 Black Hole Taps. A small cult has formed around your operation. They believe the Hawking radiation is a message. They're wrong. You've checked. Though the numbers are... interesting.",
            300: "300 Black Hole Taps. The collected Hawking radiation from your operation has been described as 'technically a new star.' It isn't. But the sentiment is appreciated.",
        },
    },
    {
        id: 'wormholePipeline',
        name: 'Wormhole Pipeline',
        baseCost: 40000,
        baseProduction: 100,
        description: "Einstein and Rosen described wormholes in 1935. They said: 'theoretically possible, probably unstable.' You say: 'I'll use the stable ones.' Einstein says nothing. He's been dead for decades. Work begins.",
        theme: 'Routing stardust through shortcuts in spacetime',
        flavorText: {
            1: "One wormhole pipeline. It connects your main brewery to a point 40 light-years away. Delivery has never been faster or more nauseating.",
            10: "Ten wormhole pipelines. Spacetime is starting to look like a reasonable commute map. Commuters are concerned.",
            25: "Twenty-five wormhole pipelines. You've accidentally created the first intergalactic transit system. The fare is 'one unit of stardust.' Everyone pays.",
            50: "Fifty wormhole pipelines. A physicist describes your network as 'the most terrifying infrastructure project in human history.' You add this to your marketing.",
            100: "100 Wormhole Pipelines. Spacetime has started filing formal complaints. Your lawyer - a very small, very fast-moving entity named 'Metric' - handles them.",
            150: "150 Wormhole Pipelines. Three separate civilizations have used your pipeline network as a transit system without asking. You've started charging. They're paying.",
            200: "200 Wormhole Pipelines. A cosmologist describes the structure as 'beautiful and legally unprecedented in any universe we're aware of.' You frame the quote.",
        },
    },
    {
        id: 'dysonSwarm',
        name: 'Dyson Swarm',
        baseCost: 200000,
        baseProduction: 400,
        description: "Freeman Dyson theorized a swarm of satellites surrounding a star to capture its entire energy output. You thought: yes. Yes to all of that. The star had no say. This is capitalism.",
        theme: 'Satellites surrounding a star to capture its full output',
        flavorText: {
            1: "One Dyson Swarm. 10,000 individual satellites orbit a medium-sized star. It looks beautiful from a distance. The star is uncomfortable.",
            10: "Ten Dyson Swarms around ten different stars. From 100 light-years away, this sector is the brightest region in the galaxy. Astronomers are fascinated. You ignore their calls.",
            50: "Fifty Dyson Swarms. You've dimmed a significant portion of the galaxy's stars. SETI is now looking for YOUR signal, worried you're the alien civilization they feared.",
            100: "100 Dyson Swarms. You have dimmed a statistically significant portion of the galaxy. Amateur astronomers call this region 'the brewery sector.' It has appeared on three official star charts.",
            150: "150 Dyson Swarms. SETI has upgraded their signal search to include what they're now calling 'the brewery pattern.' They're looking for whoever is doing this. It's you. They don't know yet.",
            200: "200 Dyson Swarms. You've built the most energy-efficient structure in the recorded history of the observable universe. A plaque was made. The plaque is the size of a moon. You have it installed. Tastefully.",
        },
    },
    {
        id: 'galacticBrewery',
        name: 'Galactic Brewery',
        baseCost: 1500000,
        baseProduction: 1600,
        description: "At some point, 'brewery' stopped describing a building and started describing a civilization. You own a solar-system-spanning industrial complex. The original click that started it feels very far away.",
        theme: 'A full brewery-sized operation spanning a solar system',
        flavorText: {
            1: "One Galactic Brewery spans three planets and two moons. The HR department is a separate department on its own planet.",
            10: "Ten Galactic Breweries. You are, by most reasonable definitions, an empire. You prefer 'artisanal operation.'",
            50: "Fifty Galactic Breweries. The Milky Way is now partially branded. The galactic council has questions. You have lawyers. Specifically, 400 billion lawyers.",
            100: "100 Galactic Breweries. The Milky Way is now, by mass, approximately 3% yours. This is not enough for a controlling interest. You are looking into this.",
            150: "150 Galactic Breweries. Three nearby dwarf galaxies have petitioned to join your operation. You review the applications. Two are accepted. One is politely declined. They understand. Standards are standards.",
            200: "200 Galactic Breweries. An alien civilization contacted you. They said: 'We've been watching your operation for 3,000 years. We have questions.' You replied. The first meeting is scheduled. Catering is handled.",
        },
    },
    {
        id: 'darkMatterSiphon',
        name: 'Dark Matter Siphon',
        baseCost: 10000000,
        baseProduction: 6500,
        description: "Dark matter makes up 27% of the universe. We can't see it, touch it, or measure it directly. You built a machine to harvest it anyway. 'How?' is a question for people who aren't making this much stardust.",
        theme: "Somehow extracting energy from the 27% of the universe we can't see",
        flavorText: {
            1: "One Dark Matter Siphon. It works. How? Unknown. Why? Stardust. The scientific method has been updated accordingly.",
            10: "Ten Dark Matter Siphons. The dark matter content of this galactic region has dropped by a measurable amount. Cosmologists are alarmed. You send them gift baskets.",
            50: "Fifty Dark Matter Siphons. A paper published in Nature describes your operation as 'a cosmological emergency wrapped in a business license.' You frame it.",
            100: "100 Dark Matter Siphons. The dark matter content of this galactic cluster has measurably declined. Gravitational lensing surveys note an anomaly. The anomaly is labeled 'NB-1' in the literature.",
            150: "150 Dark Matter Siphons. A theoretical physicist publishes a paper: 'On the Systematic Harvesting of Non-Baryonic Matter and Its Implications for Cosmic Structure.' You are cited in the footnotes as 'an anonymous industrial operator.'",
            200: "200 Dark Matter Siphons. You have, technically, harvested 0.0000001% of all dark matter in the observable universe. This sounds small. It is not small.",
        },
    },
    {
        id: 'multiverseTap',
        name: 'Multiverse Tap',
        baseCost: 75000000,
        baseProduction: 25000,
        description: "The multiverse hypothesis suggests infinite parallel universes exist alongside our own. You built a tap into them. From their perspective, something is very slightly draining. They don't know it's you. You think.",
        theme: "Drawing stardust from parallel universes. They don't know. Probably.",
        flavorText: {
            1: "One Multiverse Tap. In 99% of parallel universes, you didn't build this. In this one, you did. Statistically, you're the problem universe.",
            10: "Ten Multiverse Taps. Alternate versions of you are beginning to notice. Some of them are angry. One of them sent a strongly worded letter through the tap. You kept it.",
            50: "Fifty Multiverse Taps. You've been elected 'Most Likely to Destabilize Reality' by a council of parallel yous. You accept the award. You use it as a coaster.",
            100: "100 Multiverse Taps. In 73% of parallel universes, you did not build this many. In 26%, you stopped at 99. In 1% - this one - you kept going. Statistically, you are in the outlier universe.",
            150: "150 Multiverse Taps. A parallel you has made contact. They are angry. Not about the taps. About something else entirely. The conversation is confusing and philosophically destabilizing.",
            200: "200 Multiverse Taps. The multiverse has noticed you specifically. This is not a metaphor. Something large, patient, and amused is aware of your operation. It has not intervened. It appears to be watching.",
        },
    },
];

/**
 * Building order for unlock progression
 */
export const BUILDING_ORDER = BUILDINGS.map(b => b.id);

/**
 * Get building data by ID
 */
export function getBuilding(id) {
    return BUILDINGS.find(b => b.id === id);
}

/**
 * Get the current flavor text for a building based on count
 */
export function getBuildingFlavorText(id, count) {
    const building = getBuilding(id);
    if (!building) return '';

    const thresholds = Object.keys(building.flavorText)
        .map(Number)
        .sort((a, b) => b - a);

    for (const threshold of thresholds) {
        if (count >= threshold) return building.flavorText[threshold];
    }
    return building.description;
}
