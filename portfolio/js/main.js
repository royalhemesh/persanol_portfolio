document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';

            // Slight delay for ring
            setTimeout(() => {
                cursorRing.style.left = e.clientX + 'px';
                cursorRing.style.top = e.clientY + 'px';
            }, 50);
        });

        const setupCursorHover = () => {
            const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-grid > div');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        };
        // Initial setup
        setupCursorHover();

        // Expose function for when new elements are added dynamically
        window.setupCursorHover = setupCursorHover;
    }

    // --- Active Nav Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section crosses the middle of viewport
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active', 'text-[var(--text-primary)]');
                        link.classList.add('text-[var(--text-secondary)]');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active', 'text-[var(--text-primary)]');
                            link.classList.remove('text-[var(--text-secondary)]');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Data Population (from data.js) ---

    // Render Skills
    const skillsGrid = document.querySelector('.skill-grid');
    if (skillsGrid && typeof portfolioData !== 'undefined') {
        portfolioData.skills.forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group fade-up-skill cursor-default';
            skillEl.innerHTML = `
                <div class="p-3 bg-gray-100 dark:bg-slate-800 rounded-full group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-colors">
                    <i data-lucide="${skill.icon}" class="w-6 h-6"></i>
                </div>
                <h4 class="font-medium text-center text-sm dark:text-white">${skill.name}</h4>
                <span class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">${skill.category}</span>
            `;
            skillsGrid.appendChild(skillEl);
        });
    }

    // Render Projects
    const projectGrid = document.getElementById('project-grid');
    if (projectGrid && typeof portfolioData !== 'undefined') {
        portfolioData.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'glass-panel rounded-2xl p-8 flex flex-col h-full group transition-all cursor-pointer fade-up-project project-card';
            card.innerHTML = `
                <div class="flex-grow space-y-4">
                    <div class="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">Case File #${String(project.id).padStart(3, '0')}</div>
                    <h4 class="text-xl font-bold font-playfair group-hover:text-[var(--accent)] transition-colors dark:text-white">${project.title}</h4>
                    <p class="text-sm text-[var(--text-secondary)]">${project.role}</p>
                    <p class="text-sm border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-secondary)]">
                        "${project.summary}"
                    </p>
                    <div class="flex flex-wrap gap-2 pt-4">
                        ${project.tools.slice(0, 3).map(t => `<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded-md truncate max-w-[100px]" title="${t}">${t}</span>`).join('')}
                        ${project.tools.length > 3 ? `<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded-md">+${project.tools.length - 3}</span>` : ''}
                    </div>
                </div>
                <div class="pt-8 flex items-center justify-between mt-auto">
                    <span class="text-sm font-medium flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                        View Investigation <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                    </span>
                </div>
            `;
            card.addEventListener('click', () => openProjectModal(project));
            projectGrid.appendChild(card);
        });
    }

    // Re-init lucide icons and cursor hover for newly added DOM elements
    if (window.lucide) {
        window.lucide.createIcons();
    }
    if (window.setupCursorHover) {
        window.setupCursorHover();
    }

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body');

    function openProjectModal(project) {
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        modalBody.innerHTML = `
            <div class="space-y-8">
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <span class="text-[var(--accent)] text-sm font-medium tracking-widest uppercase mb-2 block">Case File #${String(project.id).padStart(3, '0')}</span>
                            <h2 class="text-3xl font-playfair font-bold dark:text-white">${project.title}</h2>
                        </div>
                        <a href="https://${project.repo}" target="_blank" class="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                            View Repository <i data-lucide="external-link" class="w-4 h-4"></i>
                        </a>
                    </div>
                    <div class="flex gap-4 text-sm text-[var(--text-secondary)] dark:text-slate-400 border-b border-[var(--border-color)] pb-4">
                        <span><i data-lucide="briefcase" class="w-4 h-4 inline mr-1"></i>${project.role}</span>
                        <span><i data-lucide="calendar" class="w-4 h-4 inline mr-1"></i>${project.date}</span>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-bold font-playfair mb-2 flex items-center gap-2 dark:text-white">
                                <i data-lucide="target" class="text-[var(--accent)]"></i> Hypothesis / Problem
                            </h3>
                            <p class="text-[var(--text-secondary)] dark:text-slate-300 text-sm leading-relaxed">${project.problem}</p>
                        </div>
                        
                        <div>
                            <h3 class="text-lg font-bold font-playfair mb-2 flex items-center gap-2 dark:text-white">
                                <i data-lucide="database" class="text-[var(--accent)]"></i> Dataset
                            </h3>
                            <p class="text-[var(--text-secondary)] dark:text-slate-300 text-sm leading-relaxed">${project.dataset}</p>
                        </div>

                        <div>
                            <h3 class="text-lg font-bold font-playfair mb-2 flex items-center gap-2 dark:text-white">
                                <i data-lucide="microscope" class="text-[var(--accent)]"></i> Methodology
                            </h3>
                            <p class="text-[var(--text-secondary)] dark:text-slate-300 text-sm leading-relaxed">${project.process}</p>
                        </div>
                    </div>

                    <div class="space-y-6 bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-color)]">
                        <div>
                            <h3 class="text-lg font-bold font-playfair mb-3 dark:text-white">Instruments Used</h3>
                            <div class="flex flex-wrap gap-2">
                                ${project.tools.map(t => `<span class="bg-gray-200 dark:bg-slate-700 dark:text-slate-200 text-xs px-3 py-1.5 rounded-full font-medium">${t}</span>`).join('')}
                            </div>
                        </div>

                        <div class="pt-4 border-t border-[var(--border-color)]">
                            <h3 class="text-lg font-bold font-playfair mb-2 text-blue-600 dark:text-blue-400">Findings</h3>
                            <p class="text-[var(--text-primary)] dark:text-slate-200 font-medium text-sm leading-relaxed mb-4">${project.findings}</p>
                            
                            <h3 class="text-lg font-bold font-playfair mb-2 text-[var(--accent)]">Business Impact</h3>
                            <p class="text-[var(--text-primary)] dark:text-slate-200 font-medium text-sm leading-relaxed">${project.impact}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (window.lucide) {
            window.lucide.createIcons({
                root: modalBody
            });
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Slight delay for animation triggers
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function closeModal() {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form submission handle
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader" class="animate-spin w-5 h-5 mx-auto"></i>';
            if (window.lucide) window.lucide.createIcons();

            setTimeout(() => {
                form.reset();
                btn.innerHTML = 'Signal Received <i data-lucide="check" class="w-4 h-4 ml-2"></i>';
                btn.classList.add('bg-green-500', 'text-white');
                if (window.lucide) window.lucide.createIcons();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-500', 'text-white');
                    if (window.lucide) window.lucide.createIcons();
                }, 3000);
            }, 1000);
        });
    }
});
