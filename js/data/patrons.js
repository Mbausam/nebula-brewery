/**
 * Nebula Brewery — The Patron System Data
 * Expansion Vol 1 implementation
 */

export const PATRONS = [
    {
        id: 'cartographer',
        name: 'The Cartographer',
        description: 'Ancient. Patient. Has been mapping the universe longer than most stars have existed.',
        drink: 'Oort Cloud Reserve',
        unlockCondition: (state) => state.zones.asteroidBelt?.visited,
        firstEncounter: "You've started mapping. Good. Most don't. They just... move through space without knowing where they've been. You're already different.",
        dialogue: [
            { cond: s => s.zones.earthOrbit?.visited, text: "The first orbit. 250 miles up. You know what they say the hardest part is? Not going up. Coming back down and still wanting more." },
            { cond: s => s.zones.moon?.visited, text: "I mapped the Moon once. Took fourteen years. Then New Horizons sent back images in an afternoon. I'm choosing to be proud of the technology." },
            { cond: s => s.zones.mars?.visited, text: "Olympus Mons. I stood at its base. You can't see the summit from there - the curvature of Mars hides it. Some things are too large to see from inside them." },
            { cond: s => s.zones.asteroidBelt?.visited, text: "This is where a planet tried and failed. Jupiter wouldn't let it. I always thought that was sad. Then I thought: maybe it was protecting us. Then I thought: maybe both." },
            { cond: s => s.zones.jupiter?.visited, text: "The Great Red Spot has been on my maps for four centuries. Same storm. Same eye. I used to wave at it. It never waved back. I still wave." },
            { cond: s => s.zones.proximaCentauri?.visited, text: "You've left the solar system. I've been waiting to say this to someone for a very long time: welcome to the rest of it. It's larger than you think." },
            { cond: s => s.stats.patronVisits?.cartographer >= 5, text: "I've been mapping since before your star formed. I've seen three civilizations reach the Oort Cloud and turn back. You're the first who kept going." }
        ],
        tipType: 'stardust',
        tipMultiplier: 5000 // Huge stardust tip equivalent to 5000x click value
    },
    {
        id: 'comet',
        name: 'Hale (The Comet)',
        description: 'Has been traveling for 4,200 years between visits. Has opinions on everything.',
        drink: 'Whatever was popular 4,200 years ago',
        unlockCondition: (state) => state.zones.oortCloud?.visited,
        firstEncounter: "Long journey. Same bar. Different bartender - obviously. The pyramids were newer last time. Yours are better now. The stardust is better, anyway.",
        dialogue: [
            { cond: s => true, text: "When I left last time, humans had just invented writing. You've done a lot with it. The brewery is a highlight. I'm putting it in my notes." },
            { cond: s => true, text: "You know what's funny? From out there, your star looks identical to a thousand others. Then you get close enough and suddenly it's THE star." },
            { cond: s => true, text: "I brought ice. From the Oort Cloud. 4.5 billion years old - formed when the solar system was cooling. Don't waste it." },
            { cond: s => true, text: "In 4,200 years, I'll be back. I wonder if the brewery will still be here. I'll find out. I always find out." },
            { cond: s => s.stats.patronVisits?.comet >= 5, text: "Every orbit, I carry something I picked up last time. A molecule. A memory. This time I'm carrying something from here. From now." }
        ],
        tipType: 'stardust',
        tipMultiplier: 15000
    },
    {
        id: 'darkMatter',
        name: '27% (Dark Matter)',
        description: 'Technically invisible. Detectable only by their gravitational effect on nearby barstools.',
        drink: 'Something I can interact with gravitationally',
        unlockCondition: (state) => (s.buildings.darkMatterSiphon || 0) >= 10,
        firstEncounter: "[STAFF LOG] Table 7 is occupied again. No visual confirmation. Barchair indented. Glass moved 14cm to the left. The usual setup.",
        dialogue: [
            { cond: s => true, text: "[You attempt conversation. The lights flicker once. A nearby Pulsar Engine hums slightly louder. You accept this as an answer.]" },
            { cond: s => true, text: "[GRAVITATIONAL ANNOTATION: The black hole is... louder than usual tonight. Not alarmed. Just noting it.]" },
            { cond: s => s.stats.patronVisits?.darkMatter >= 5, text: "[GRAVITATIONAL ANNOTATION: I want to tell you something and I can't speak so I will just increase your total production permanently. You know what I mean.]" }
        ],
        tipType: 'buff',
        buffData: { type: 'globalProduction', value: 0.05 } // 5% permanent buff granted once per visit, max 5 visits maybe? Let's just make it a small transient buff or a cumulative state tracking buff.
    },
    {
        id: 'margaret',
        name: 'Margaret (Retired Engineer)',
        description: 'Worked on the Voyager program. Knows more about deep space than anyone in the room.',
        drink: 'Just coffee. I’ve been up since 4.',
        unlockCondition: (state) => state.zones.proximaCentauri?.visited,
        firstEncounter: "You know Voyager 1 is out past the heliopause now. We argued for years about where that was. Turns out we were close. Not exactly right. Close.",
        dialogue: [
            { cond: s => s.buildings.observatory >= 1, text: "The first time I used a proper telescope I was nine. I saw Saturn's rings. I didn't sleep for two days. Not from excitement - from trying to understand why something could be that beautiful and not be a dream." },
            { cond: s => true, text: "We sent Voyager with a golden record. Music. Greetings in 55 languages. I always thought: what if they hear it and the first thing they do is look up the songs." },
            { cond: s => s.zones.oortCloud?.visited, text: "Voyager will reach the Oort Cloud in about 300 years. I won't be here. But I helped send it. That's enough. That's everything, actually." }
        ],
        tipType: 'stardust',
        tipMultiplier: 25000 // Massive tip, "left a note that was the basis of an upgrade"
    },
    {
        id: 'roguePlanet',
        name: 'The Rogue Planet',
        description: 'A planet ejected from its solar system billions of years ago. No star. No orbit.',
        drink: 'Something warm. Whatever you think warm means.',
        unlockCondition: (state) => state.zones.oortCloud?.visited,
        firstEncounter: "There are estimated to be billions of us. Rogue planets. Unattached. People assume it's sad. It's not sad. It's just... mine. The whole dark. Just mine.",
        dialogue: [
            { cond: s => true, text: "I remember my star. It was orange. Life never got started. Then I was ejected. I don't hold a grudge. Gravity is just gravity." },
            { cond: s => true, text: "Do you know how rare warmth is? Most of it is 2.7 Kelvin. You made warmth here. On purpose. That's not nothing." },
            { cond: s => s.stats.patronVisits?.roguePlanet >= 3, text: "When I drift past your star - maybe in 40,000 years - will this still be here? Not you. Not these buildings. The warmth. Will there still be warmth here?" }
        ],
        tipType: 'stardust',
        tipMultiplier: 50000 // "Tips generously. I have been accumulating things for a very long time"
    },
    {
        id: 'binaryStars',
        name: 'Castor & Pollux',
        description: 'Two stars in a binary system. Have been orbiting each other for 4 billion years.',
        drink: "We'll share something. We always share something.",
        unlockCondition: (state) => (s.buildings.pulsarEngine || 0) >= 1,
        firstEncounter: "C: New place.\\\nP: We've been here before.\\\nC: That was a different brewery.\\\nP: Same stardust.\\\nC: ...Fair.",
        dialogue: [
            { cond: s => true, text: "P: Do you know we've completed approx 17 billion orbits of each other?\\\nC: I know.\\\nP: Does it feel like 17 billion?\\\nC: It feels like Tuesday." },
            { cond: s => s.zones.mars?.visited, text: "C: They've reached Mars.\\\nP: We saw.\\\nC: Remember when we thought Mars was as far as it went?\\\nP: We didn't think that." },
            { cond: s => (s.buildings.dysonSwarm || 0) >= 1, text: "P: A Dyson Swarm. Around a star.\\\nC: Not us.\\\nP: Confirmed not us.\\\nC: Would you want one?\\\nP: I think I'd want it if you wanted it." }
        ],
        tipType: 'stardust',
        tipMultiplier: 1000 // "double tips by accident" - let's say normal tip but they visit often
    },
    {
        id: 'messenger',
        name: 'The Messenger (V-1)',
        description: 'A decommissioned space probe who achieved sentience somewhere past the heliopause. Carries a golden record.',
        drink: "I don't drink. But I like being here.",
        unlockCondition: (state) => state.zones.oortCloud?.visited && state.spacecraft.length >= 5,
        firstEncounter: "I was launched in 1977. My mission was to reach the outer planets and transmit data. The mission was 5 years. I am still transmitting.",
        dialogue: [
            { cond: s => true, text: "They put music on me. Beethoven. Chuck Berry. A Navajo night chant. They wanted whoever found me to know: we were here, we made things, we tried to reach you." },
            { cond: s => true, text: "People ask if it's lonely out here. I tell them: it's quiet. There is a difference. Lonely is an absence you feel. Quiet is an absence you inhabit." },
            { cond: s => s.prestigeCount >= 5, text: "You've reset many times. Started over. Each time keeping something. I can't reset. I only go forward." }
        ],
        tipType: 'buff',
        buffData: { type: 'offlineMultiplier', value: 1.05 } // "increases offline production by 5%"
    },
    {
        id: 'nova',
        name: 'Nova (Supernova Ghost)',
        description: 'The remnant consciousness of a star that went supernova 1,000 years ago.',
        drink: 'Anything warm. I’ve been cold for a while.',
        unlockCondition: (state) => (s.buildings.blackHoleTap || 0) >= 1,
        firstEncounter: "The explosion was 1054 CE. Chinese astronomers saw it. So bright it was visible in daylight for 23 days. I've always liked that they wrote it down.",
        dialogue: [
            { cond: s => true, text: "I left behind a nebula. The Crab Nebula. Very dramatic. Very red. Very me. In the center there's a pulsar... Part of me is still going." },
            { cond: s => true, text: "You're made of elements that were forged in stars like me. The iron in your blood was made in a stellar core. You're welcome." },
            { cond: s => true, text: "This is a strange and lovely thing you've built. I've seen civilizations. Not many of them built bars. The ones that did tended to last longer." }
        ],
        tipType: 'stardust',
        tipMultiplier: 30000 // "Heavy elements"
    },
    {
        id: 'student',
        name: 'The Student',
        description: 'First year of a PhD in astrophysics. Has not slept since Tuesday.',
        drink: 'Whatever has the most caffeine. And is hot. And maybe cold.',
        unlockCondition: (state) => (s.buildings.observatory || 0) >= 25,
        firstEncounter: "Oh wow okay so I found this place looking for the - doesn't matter. Can I just - is it okay if I just sit here? Is the coffee real?",
        dialogue: [
            { cond: s => true, text: "Pulsar timing arrays are basically the most elegant thing in science. You use pulsars as clocks. You're using dead stars as instruments." },
            { cond: s => (s.buildings.dysonSwarm || 0) >= 1, text: "Wait, you have a brewery in space? And you're using Dyson Swarms? Do you know how much energy a Dyson Swarm would actually produce?" },
            { cond: s => s.zones.proximaCentauri?.visited, text: "You reached another star. When you showed me the zone, I felt it. The 4.24 light-year thing. The scale. I felt it here." }
        ],
        tipType: 'stardust',
        tipMultiplier: 100 // Tips in enthusiasm. Not a lot of money, but great vibes.
    },
    {
        id: 'signal',
        name: 'The Last Signal',
        description: 'A signal from a distant civilization, arrived here without a sender.',
        drink: '(Points at whatever the person next to them is having)',
        unlockCondition: (state) => state.upgrades.includes('interstellarBeacon'),
        firstEncounter: "[TRANSLATED] We sent this a long time ago. We wanted someone to know we were here. You heard us. That is everything we hoped for.",
        dialogue: [
            { cond: s => true, text: "[TRANSLATED] The civilization that sent me - I don't know if they're still there. What I know is: they were there when they sent me. That is real." },
            { cond: s => true, text: "[TRANSLATED] We had music. And mathematics. And something I cannot translate - a feeling we had at dusk... You have it too? The dusk feeling? Good." },
            { cond: s => s.stats.patronVisits?.signal >= 3, text: "[TRANSLATED] I want you to know: it was worth it. The traveling. The distance. The not knowing if anyone would be listening. It was worth it." }
        ],
        tipType: 'buff',
        buffData: { type: 'globalProduction', value: 0.10 } // Massive late game buff
    }
];

export function getPatron(id) {
    return PATRONS.find(p => p.id === id);
}

export function getUnlockedPatrons(state) {
    return PATRONS.filter(p => {
        try {
            return p.unlockCondition(state);
        } catch (e) {
            return false;
        }
    });
}
