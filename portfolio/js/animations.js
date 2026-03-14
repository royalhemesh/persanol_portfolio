document.addEventListener('DOMContentLoaded', () => {

    // --- Particle Network Background (Canvas) ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = window.innerWidth > 768 ? 100 : 50;
        const linkDistance = 150;

        // Theme variables mapping (Dark Intelligence)
        let dotColor = 'rgba(0, 212, 170, 0.2)'; // Teal dots
        let lineColor = 'rgba(0, 212, 170, 0.08)'; // Subtle teal lines

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.25; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.25;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = dotColor;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < linkDistance) {
                        const opacity = 1 - (distance / linkDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Make line opacity relative to distance
                        ctx.strokeStyle = `rgba(0, 212, 170, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawLines();
            requestAnimationFrame(animateCanvas);
        }

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        initParticles();
        animateCanvas();
    }

    // --- GSAP Scroll Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    gsap.fromTo('.word-reveal span',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );

    // Hero Subtext & Buttons
    gsap.fromTo('.fade-up',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out", delay: 0.8 }
    );

    // Hero Profile Image
    gsap.fromTo('.hero-visual img',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Section Dividers
    gsap.utils.toArray('.divider-anim').forEach(divider => {
        gsap.fromTo(divider,
            { width: "0%" },
            {
                width: "100%",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: divider,
                    start: "top 90%"
                }
            }
        );
    });

    // Act 2 Header
    gsap.utils.toArray('.section-header').forEach((el, index) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                }
            }
        );
    });

    // Skills Grid Stagger
    ScrollTrigger.batch(".fade-up-skill", {
        interval: 0.1,
        batchMax: 4,
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", overwrite: true })
    });

    // Project Cards Stagger
    ScrollTrigger.batch(".fade-up-project", {
        interval: 0.2,
        batchMax: 3,
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power3.out", overwrite: true })
    });

    // Act 3 Impact & Contact
    gsap.utils.toArray('.fade-up-impact').forEach((el) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                }
            }
        );
    });

    // Chart Section Content Fade
    gsap.fromTo('.content-fade',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.content-fade', start: 'top 80%' } }
    );
    gsap.fromTo('.chart-container',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.2, scrollTrigger: { trigger: '.chart-container', start: 'top 80%' } }
    );

});
