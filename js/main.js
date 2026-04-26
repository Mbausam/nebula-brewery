/**
 * Nebula Brewery — Main Bootstrap
 * Entry point. Initializes all systems and starts the game loop.
 */

import { state, replaceState } from './state.js';
import { startGameLoop } from './engine.js';
import { loadGame, startAutoSave, calculateOfflineProduction, saveGame } from './save.js';
import { calculateProductionPerSecond } from './engine.js';
import { initUI, updateUI, showOfflineProduction } from './ui.js';

// --- Boot Sequence ---
(function boot() {
    console.log('%c✦ NEBULA BREWERY ✦', 'font-size: 24px; color: #F59E0B; font-family: serif;');
    console.log('%cA Space Idle Clicker Game', 'font-size: 14px; color: #94A3B8;');
    console.log('%c—————————————————————', 'color: #1E293B');

    // 1. Load saved game (or start fresh)
    const savedState = loadGame();
    if (savedState) {
        replaceState(savedState);
        console.log('%c✓ Save loaded', 'color: #22C55E');
    } else {
        console.log('%c✦ New game started', 'color: #F59E0B');
    }

    // 2. Initialize UI
    initUI();

    // 3. Calculate offline production (if returning)
    if (savedState && savedState.lastSaved) {
        const pps = calculateProductionPerSecond();
        const offlineEarnings = calculateOfflineProduction(savedState.lastSaved, pps);
        if (offlineEarnings > 0) {
            state.stardust += offlineEarnings;
            state.totalEarned += offlineEarnings;
            showOfflineProduction(offlineEarnings);
            console.log(`%c✓ Offline production: +${offlineEarnings.toLocaleString()} stardust`, 'color: #22C55E');
        }
    }

    // 4. Start game loop
    startGameLoop(updateUI);

    // 5. Start auto-save
    startAutoSave();

    console.log('%c✓ Game running', 'color: #22C55E');
    console.log('%c—————————————————————', 'color: #1E293B');
    console.log('%cTip: The universe is listening.', 'color: #7C3AED; font-style: italic;');
})();
