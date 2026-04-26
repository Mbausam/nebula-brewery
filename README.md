# ✦ NEBULA BREWERY ✦

**A space idle clicker game.** Click a star. Build a brewery. Explore the universe. Accidentally learn astrophysics.

[![Netlify Status](https://img.shields.io/badge/play-now-F59E0B?style=for-the-badge)](https://mbausam.github.io/nebula-brewery)
[![License](https://img.shields.io/badge/license-MIT-7C3AED)](./LICENSE)
[![Made with](https://img.shields.io/badge/made%20with-vanilla%20JS-06B6D4)]()

---

## 🍺 What is this?

Nebula Brewery is an idle clicker in the spirit of Cookie Clicker and Universal Paperclips — but set in space, with a deliberately hidden secret mission: **you're going to learn real astrophysics whether you like it or not.**

Every fact is real. Every joke is earned. Every upgrade makes you want the next one immediately. The game should feel like you wandered into a bar at the edge of the universe, ordered a drink, and woke up understanding what a pulsar is.

---

## ✨ Features

- **Click a nebula star** — collect stardust, the game's single currency
- **11 buildings** — from humble Observatories to Multiverse Taps that drain parallel universes (they don't know, probably)
- **8 spacecraft tiers** — StarHopper to The Absurdity, each unlocking new exploration zones
- **14 exploration zones** — Earth Orbit to the Observable Universe Edge, each with real NASA/EASA astronomical facts wrapped in absurdist commentary
- **60+ upgrades** — click upgrades, building upgrades, global production boosts, and space tech
- **42+ achievements** — production milestones, exploration discoveries, and hidden secrets
- **Big Bang Reset** — the prestige mechanic. Collapse your operation and restart with permanent Cosmic Memory multipliers
- **10 unique patrons** — cosmic characters who visit your brewery bar with evolving dialogue trees
- **News ticker** — scrolling headlines blending real space facts with absurdity ("Pluto sends strongly-worded letter to IAU regarding 'planet' reclassification")
- **Procedural audio** — Web Audio API sounds, no external files
- **Canvas particles** — stardust bursts, milestone flashes, tiered click feedback
- **Offline production** — earn 50% stardust while away, capped at 8 hours
- **Save/load** — localStorage with export/import as base64 strings
- **Zero dependencies** — no frameworks, no build step, no npm. Just vanilla JS, HTML, and CSS.

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Mbausam/nebula-brewery.git

# Start any static server (ES modules need HTTP, not file://)
cd nebula-brewery
python -m http.server 8080

# Open http://localhost:8080
```

That's it. No `npm install`. No build step. Open the browser and click the star.

---

## 🧠 The Educational Contract

> Every real fact must be presented with absurd commentary that makes it MORE memorable, not less. The humor is the delivery mechanism for the education.

Nebula Brewery has a hidden second purpose: it's a space education platform in disguise. Players will encounter real astronomical facts dressed as game flavor text, learn about actual spacecraft and cosmic phenomena through zone discovery, and absorb the true scale of the universe through escalating numbers. If you walk away knowing one real thing about space that you didn't know before — that's a win. If you learn ten, that's a triumph. If you go look something up, that's everything.

---

## 🎨 Design Philosophy

| Element | Approach |
|---|---|
| Visual | Space bar at the edge of the universe — warm, worn, alive with color, deep-space darkness always present |
| Writing | Absurdist humor + genuine love of space. The Oort Cloud can make you feel something and also be funny. Both are true. |
| Audio | Procedural Web Audio API — cosmic chimes, deep purchase thunks, ambient drone that deepens as you progress |
| Pacing | Fast early stages, deliberately slow late stages — never boring. Each purchase should make you want the next one immediately. |

---

## 📁 Project Structure

```
nebula-brewery/
├── index.html              # Single-page app entry point
├── css/
│   └── style.css           # Full design system (GDD Section 10)
├── js/
│   ├── main.js             # Bootstrap — loads save, starts loop
│   ├── engine.js           # Core game loop, production, purchases, prestige
│   ├── state.js            # Event-driven state with pub/sub
│   ├── ui.js               # DOM rendering, event binding, ticker animation
│   ├── save.js             # localStorage persistence, export/import, offline calc
│   ├── format.js           # Large number formatting (K, M, B, T... Googol)
│   ├── audio.js            # Web Audio API procedural sound system
│   ├── particles.js        # Canvas particle effects
│   └── data/
│       ├── buildings.js    # 11 buildings with full flavor text
│       ├── upgrades.js     # Click, building, global, and space tech upgrades
│       ├── spacecraft.js   # 8 spacecraft tiers
│       ├── zones.js        # 14 exploration zones with real space facts
│       ├── achievements.js # 42+ achievements
│       ├── news.js         # 180+ ticker headlines
│       └── patrons.js      # 10 patrons with dialogue trees
├── assets/
│   └── favicon.svg
└── docs/
    ├── NEBULA_BREWERY_GDD_v1.0.txt        # Full Game Design Document
    └── NEBULA_BREWERY_Expansion_Vol1.txt  # Expansion content supplement
```

---

## 🗺️ Roadmap

### v1.0 (current)
- [x] Core idle loop — click, buildings, upgrades, prestige
- [x] 11 buildings with full flavor text
- [x] 8 spacecraft + 14 exploration zones
- [x] News ticker, patrons, achievements
- [x] Save/load with offline production

### v1.5
- [ ] Zone discovery cinematic animations
- [ ] Real NASA/ESA image integration for zone backgrounds
- [ ] Golden record playable (actual Voyager audio)
- [ ] Return visit dialogue for all zones

### v2.0
- [ ] PWA support (installable, offline mode)
- [ ] Mobile-optimized touch controls
- [ ] Statistics dashboard
- [ ] Accessibility: reduced motion, high contrast, screen reader support

### v3.0
- [ ] Tier 11 building (unlocked post-prestige)
- [ ] Seasonal events tied to real astronomical phenomena
- [ ] Educator Mode — all facts with citations and deeper reading links

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Language | JavaScript (ES6+ modules) |
| UI | Vanilla JS + CSS Custom Properties |
| State | Plain JS object + pub/sub |
| Audio | Web Audio API (procedural) |
| Particles | Canvas 2D |
| Storage | localStorage |
| Hosting | GitHub Pages (free, static) |

---

## 📖 Inspiration

- **Cookie Clicker** — the idle loop, the news ticker, the secrets
- **Universal Paperclips** — escalating absurdity, philosophical undertones
- **Kittens Game** — deep systems, long-term progression
- **Carl Sagan's Pale Blue Dot** — the philosophical heart of why space matters
- **NASA APOD** — daily dose of real wonder

---

## 📄 License

MIT — brew freely.

---

*"The universe is 13.8 billion years old. It started with a single, incomprehensible explosion of everything from nothing. You're about to do something similar. But smaller. On purpose."*
