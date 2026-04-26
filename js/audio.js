/**
 * Nebula Brewery — Web Audio API Sound System
 * Procedurally generated sounds — no external audio files needed.
 */

let audioCtx = null;
let masterGain = null;
let musicGain = null;
let musicOscillators = [];
let soundEnabled = true;
let musicEnabled = true;

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.3;
        masterGain.connect(audioCtx.destination);

        musicGain = audioCtx.createGain();
        musicGain.gain.value = 0.08;
        musicGain.connect(audioCtx.destination);
    }
    return audioCtx;
}

export function setSoundEnabled(enabled) {
    soundEnabled = enabled;
}

export function setMusicEnabled(enabled) {
    musicEnabled = enabled;
    if (musicGain) musicGain.gain.value = enabled ? 0.08 : 0;
    if (!enabled) stopAmbientMusic();
}

// --- Click Sound ---
export function playClickSound(tier = 0) {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Crystal chime — higher harmonics for higher tiers
    const baseFreq = 800 + tier * 100;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.15);

    gain.gain.setValueAtTime(0.15 + tier * 0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + tier * 0.05);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.3 + tier * 0.05);

    // Add shimmer for higher tiers
    if (tier >= 3) {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(baseFreq * 2, now);
        gain2.gain.setValueAtTime(0.05, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start(now);
        osc2.stop(now + 0.2);
    }
}

// --- Purchase Sound (deep thump) ---
export function playPurchaseSound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
}

// --- Upgrade Sound (3-note ascending arpeggio) ---
export function playUpgradeSound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
    });
}

// --- Achievement Fanfare ---
export function playAchievementSound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.5);
    });
}

// --- Zone Discovery (sustained swell) ---
export function playZoneDiscoverySound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Low pad swell
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(330, now); // Perfect fifth

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 1.5);
    gain.gain.linearRampToValueAtTime(0.08, now + 3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(masterGain);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.5);
    osc2.stop(now + 4.5);
}

// --- Can't Afford (soft negative) ---
export function playCantAffordSound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.2);
}

// --- Prestige Sound (crescendo → silence → tone) ---
export function playPrestigeSound() {
    if (!soundEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Crescendo noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(2000, now + 1.5);
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.15, now + 1.5);
    noiseGain.gain.setValueAtTime(0, now + 1.6);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);
    noise.stop(now + 1.7);

    // Single reverberant tone after silence
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now + 2.5);
    gain.gain.setValueAtTime(0, now + 2.5);
    gain.gain.linearRampToValueAtTime(0.2, now + 2.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 5);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now + 2.5);
    osc.stop(now + 5.5);
}

// --- Ambient Music (Generative Pad) ---

export function startAmbientMusic() {
    if (!musicEnabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    stopAmbientMusic();

    // Deep drone pad with slow evolution
    const notes = [55, 82.41, 110, 164.81]; // A1, E2, A2, E3

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = i < 2 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle detuning for warmth
        osc.detune.setValueAtTime(Math.random() * 10 - 5, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400 + i * 100, now);
        filter.Q.setValueAtTime(1, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03 / (i + 1), now + 3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(musicGain);
        osc.start(now);

        musicOscillators.push({ osc, gain, filter });
    });
}

export function stopAmbientMusic() {
    const ctx = audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;

    musicOscillators.forEach(({ osc, gain }) => {
        try {
            gain.gain.linearRampToValueAtTime(0, now + 1);
            osc.stop(now + 1.5);
        } catch (e) { /* already stopped */ }
    });
    musicOscillators = [];
}

// --- Initialize audio on first user interaction ---
export function initAudio() {
    getCtx();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}
