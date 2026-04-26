/**
 * Nebula Brewery — Spacecraft Data
 * All 8 spacecraft tiers from GDD Section 5.1.
 */

export const SPACECRAFT = [
    {
        id: 'starHopper',
        name: 'StarHopper',
        cost: 1000,
        range: 'Earth Orbit → Moon',
        zones: ['earthOrbit', 'moon'],
        specialAbility: 'Basic scanning',
        realInspiration: 'SpaceX Starhopper test vehicle (2019)',
        flavorText: "Small. Scrappy. Named after a rocket that mostly just hopped. But it hops in the right direction. Toward the stars. You respect that. It doesn't care. It's a spacecraft.",
    },
    {
        id: 'novaWing',
        name: 'NovaWing',
        cost: 10000,
        range: 'Mars → Asteroid Belt',
        zones: ['mars', 'asteroidBelt'],
        specialAbility: 'Mineral collection',
        realInspiration: "Inspired by NASA's Dawn asteroid mission",
        flavorText: "Sleek. Fast. Designed for the asteroid belt, which turns out to be nothing like the movies. Far fewer near-misses. Far more rocks just floating, minding their business. The NovaWing minds its business too. Then collects their minerals.",
    },
    {
        id: 'voidGlider',
        name: 'VoidGlider',
        cost: 50000,
        range: 'Jupiter → Saturn',
        zones: ['jupiter', 'saturn'],
        specialAbility: 'Gas harvesting',
        realInspiration: 'Cassini-Huygens Saturn mission',
        flavorText: "At Jupiter, the size of things changes. The VoidGlider was built knowing it would feel small next to the Great Red Spot. It was built to not care. It mostly succeeds.",
    },
    {
        id: 'nebulaCruiser',
        name: 'NebulaCruiser',
        cost: 250000,
        range: 'Kuiper Belt → Oort Cloud',
        zones: ['pluto', 'oortCloud'],
        specialAbility: 'Dark matter sampling',
        realInspiration: 'New Horizons Pluto/Kuiper Belt mission',
        flavorText: "You are now past the planets. Past Pluto (a planet in your heart). Into the Kuiper Belt, where the solar system keeps its old stuff, the things it's not sure what to do with. You understand. You brew from it.",
    },
    {
        id: 'eventHorizon',
        name: 'Event Horizon',
        cost: 1000000,
        range: 'Nearby Stars → Exoplanets',
        zones: ['proximaCentauri', 'trappist1'],
        specialAbility: 'Wormhole detection',
        realInspiration: 'James Webb Space Telescope (real science)',
        flavorText: "The name is aspirational. You haven't crossed an event horizon. You've visited nearby stars. It's still extraordinary. 'Event horizon adjacent' is still a remarkable place to be.",
    },
    {
        id: 'singularityDrive',
        name: 'Singularity Drive',
        cost: 5000000,
        range: 'Galactic Core → Andromeda',
        zones: ['galacticCore', 'andromeda'],
        specialAbility: 'Intergalactic travel',
        realInspiration: 'Theoretical: nuclear pulse or fusion drive',
        flavorText: "The drive works by principles you've stopped trying to explain to people at parties. 'It uses singularities.' 'Like black holes?' 'Sort of.' 'Is it safe?' 'Define safe.' You've stopped going to parties.",
    },
    {
        id: 'infinityVessel',
        name: 'Infinity Vessel',
        cost: 25000000,
        range: 'Observable Universe',
        zones: ['universeEdge'],
        specialAbility: 'Reality bending',
        realInspiration: 'Theoretical: Alcubierre warp metric',
        flavorText: "You built a ship to travel to the edge of the observable universe. When you got there, there was no edge. Just more universe. And a sign that said: 'This is not the edge. Please stop looking for edges. - The Universe.'",
    },
    {
        id: 'theAbsurdity',
        name: 'The Absurdity',
        cost: 100000000,
        range: 'Beyond known space',
        zones: ['theVoid'],
        specialAbility: '[REDACTED]',
        realInspiration: '"Some doors open from the other side."',
        flavorText: "We don't talk about the Absurdity. Not because it's secret. Because language hasn't caught up to what it is yet. You'll know when you're ready. The Absurdity will wait. It's patient.",
    },
];

export function getSpacecraft(id) {
    return SPACECRAFT.find(s => s.id === id);
}
