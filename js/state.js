/**
 * Nebula Brewery — Game State Model
 * Central state management with pub/sub for reactive UI updates.
 */

// --- Event System ---
const listeners = {};

export function onStateChange(key, callback) {
  if (!listeners[key]) listeners[key] = [];
  listeners[key].push(callback);
}

function emit(key, value) {
  if (listeners[key]) listeners[key].forEach(cb => cb(value));
  if (listeners['*']) listeners['*'].forEach(cb => cb(key, value));
}

// --- Initial State Factory ---
export function createInitialState() {
  return {
    stardust: 0,
    totalEarned: 0,
    totalClicks: 0,
    clickValue: 1,

    buildings: {
      starCursor: 0,
      observatory: 0,
      cosmicDistillery: 0,
      nebulaFarm: 0,
      pulsarEngine: 0,
      blackHoleTap: 0,
      wormholePipeline: 0,
      dysonSwarm: 0,
      galacticBrewery: 0,
      darkMatterSiphon: 0,
      multiverseTap: 0,
    },

    upgrades: [],       // Array of purchased upgrade IDs
    spacecraft: [],     // Array of purchased spacecraft IDs

    zones: {},          // { zoneId: { unlocked: bool, visited: bool, factsRead: [] } }

    achievements: [],   // Array of earned achievement IDs

    cosmicMemory: 0,
    prestigeCount: 0,

    totalPlaytime: 0,   // Seconds
    sessionStart: Date.now(),

    settings: {
      sound: true,
      music: true,
      animations: true,
      notifications: true,
    },

    lastSaved: Date.now(),

    secretFlags: {},

    newsHistory: [],        // IDs of one-time news already shown
    tickerQueue: [],        // Current ticker headline queue

    // Stats for achievements and patrons
    stats: {
      totalBuildingsPurchased: 0,
      zonesVisited: 0,
      factsRead: 0,
      patronVisits: {}, // Track how many times each patron has visited
    },

    // Patron System State
    activePatron: null,
    lastPatronVisit: Date.now(),
    patronBuffs: [],
  };
}

// --- Game State Singleton ---
export let state = createInitialState();

// --- State Mutation Helpers ---
export function setState(key, value) {
  if (key.includes('.')) {
    const parts = key.split('.');
    let obj = state;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  } else {
    state[key] = value;
  }
  emit(key, value);
}

export function replaceState(newState) {
  state = newState;
  emit('*', state);
}

export function getState() {
  return state;
}
