/**
 * Nebula Brewery — Save/Load System
 * Handles localStorage persistence, export/import, and auto-save.
 * Per GDD Section 12.2.
 */

import { state, replaceState, createInitialState, getState } from './state.js';

const SAVE_KEY = 'nebula-brewery-save';
const SAVE_INTERVAL = 30000; // 30 seconds

let autoSaveTimer = null;

/**
 * Serialize and save current state to localStorage
 */
export function saveGame() {
    try {
        const saveData = { ...getState(), lastSaved: Date.now() };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (e) {
        console.error('Save failed:', e);
        return false;
    }
}

/**
 * Load game state from localStorage
 * Returns null if no save exists
 */
export function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;

        const saved = JSON.parse(raw);
        // Merge with defaults to handle new fields added in updates
        const defaults = createInitialState();
        const merged = deepMerge(defaults, saved);
        return merged;
    } catch (e) {
        console.error('Load failed:', e);
        return null;
    }
}

/**
 * Export save as base64 string
 */
export function exportSave() {
    try {
        const saveData = { ...getState(), lastSaved: Date.now() };
        const json = JSON.stringify(saveData);
        return btoa(unescape(encodeURIComponent(json)));
    } catch (e) {
        console.error('Export failed:', e);
        return null;
    }
}

/**
 * Import a base64 save string
 */
export function importSave(str) {
    try {
        const json = decodeURIComponent(escape(atob(str.trim())));
        const saved = JSON.parse(json);

        // Basic validation
        if (typeof saved.stardust !== 'number' || !saved.buildings) {
            throw new Error('Invalid save data');
        }

        const defaults = createInitialState();
        const merged = deepMerge(defaults, saved);
        replaceState(merged);
        saveGame();
        return true;
    } catch (e) {
        console.error('Import failed:', e);
        return false;
    }
}

/**
 * Wipe all save data and reset
 */
export function wipeSave() {
    localStorage.removeItem(SAVE_KEY);
    replaceState(createInitialState());
}

/**
 * Start auto-save timer
 */
export function startAutoSave() {
    if (autoSaveTimer) clearInterval(autoSaveTimer);
    autoSaveTimer = setInterval(saveGame, SAVE_INTERVAL);

    // Save on tab close / visibility change
    window.addEventListener('beforeunload', saveGame);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') saveGame();
    });
}

/**
 * Calculate offline production
 * Returns the amount of stardust earned while away
 * Rate: 50% of normal, capped at 8 hours
 */
export function calculateOfflineProduction(lastTimestamp, productionPerSecond) {
    if (!lastTimestamp || !productionPerSecond) return 0;

    const now = Date.now();
    let elapsedSeconds = (now - lastTimestamp) / 1000;

    // Cap at 8 hours (28,800 seconds)
    const MAX_OFFLINE_SECONDS = 8 * 60 * 60;
    elapsedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);

    // Only count if away for more than 60 seconds
    if (elapsedSeconds < 60) return 0;

    // 50% of normal production rate
    return Math.floor(elapsedSeconds * productionPerSecond * 0.5);
}

// --- Utilities ---

function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === 'object' &&
            !Array.isArray(target[key])
        ) {
            result[key] = deepMerge(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}
