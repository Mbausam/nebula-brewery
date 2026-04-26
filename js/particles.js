/**
 * Nebula Brewery — Canvas Particle System
 * Handles stardust particles, click flares, and ring effects.
 */

let canvas = null;
let ctx = null;
let particles = [];
let animationId = null;

export function initParticles(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

export function spawnClickParticles(x, y, count = 5, tier = 0) {
    if (particles.length > 150) return; // Prevent Canvas fillText lag entirely

    const colors = ['#F59E0B', '#FBBF24', '#FDE68A', '#F97316', '#7C3AED'];

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 2 + tier * 0.3;
        const size = 2 + Math.random() * 3 + tier * 0.5;

        particles.push({
            type: 'stardust',
            x, y,
            vx: Math.cos(angle) * speed * 0.3,
            vy: -speed - Math.random() * 2,
            size,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: 0.015 + Math.random() * 0.01,
            char: '✦',
        });
    }

    // Click ring
    particles.push({
        type: 'ring',
        x, y,
        radius: 5,
        maxRadius: 40 + tier * 10,
        alpha: 0.6 + tier * 0.05,
        color: '#F59E0B',
        decay: 0.03,
    });

    // Second ring for late game
    if (tier >= 4) {
        setTimeout(() => {
            particles.push({
                type: 'ring',
                x, y,
                radius: 5,
                maxRadius: 50 + tier * 8,
                alpha: 0.4,
                color: '#7C3AED',
                decay: 0.025,
            });
        }, 100);
    }
}

export function spawnMilestoneParticles(x, y) {
    // Golden pulse across the whole canvas
    particles.push({
        type: 'ring',
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 5,
        maxRadius: Math.max(canvas.width, canvas.height),
        alpha: 0.3,
        color: '#F59E0B',
        decay: 0.005,
    });

    // Extra stardust burst
    spawnClickParticles(x, y, 20, 5);
}

export function spawnFloatingText(x, y, text, color = '#F59E0B') {
    particles.push({
        type: 'text',
        x: x + (Math.random() - 0.5) * 20,
        y,
        vy: -1.5,
        alpha: 1,
        color,
        text,
        decay: 0.018,
        size: 14,
    });
}

function animate() {
    if (!ctx || !canvas) return;

    // Hard ceiling for safety
    if (particles.length > 200) {
        particles.splice(0, particles.length - 200);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === 'stardust') {
            p.x += p.vx;
            p.y += p.vy;
            p.vy *= 0.98;
            p.vx *= 0.98;
            p.life -= p.decay;
            p.alpha = p.life;

            if (p.life <= 0) { particles.splice(i, 1); continue; }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.font = `${p.size * p.life + 4}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(p.char, p.x, p.y);
            ctx.restore();

        } else if (p.type === 'ring') {
            p.radius += (p.maxRadius - p.radius) * 0.08;
            p.alpha -= p.decay;

            if (p.alpha <= 0) { particles.splice(i, 1); continue; }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

        } else if (p.type === 'text') {
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) { particles.splice(i, 1); continue; }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.font = `bold ${p.size}px 'Space Mono', monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(p.text, p.x, p.y);
            ctx.restore();
        }
    }

    animationId = requestAnimationFrame(animate);
}

export function destroy() {
    if (animationId) cancelAnimationFrame(animationId);
    particles = [];
}
