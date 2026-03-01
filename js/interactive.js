/**
 * Interactive Features for Anamika Saxena Portfolio
 * Adds scroll animations, active navigation, and other interactive elements
 */

(function() {
    'use strict';

    // ==========================================
    // 1. SCROLL PROGRESS INDICATOR
    // ==========================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0d6efd, #0b5ed7);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ==========================================
    // 2. BACK TO TOP BUTTON
    // ==========================================
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #0d6efd;
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        document.body.appendChild(backToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'translateY(-5px)';
            backToTopBtn.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
        });
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'translateY(0)';
            backToTopBtn.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
        });
    }

    // ==========================================
    // 3. ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        function updateActiveNav() {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }

    // ==========================================
    // 4. SCROLL ANIMATIONS (Fade In & Slide Up)
    // ==========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Animate sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            observer.observe(section);
        });

        // Animate cards
        const cards = document.querySelectorAll('.cert-card, .recommendation-card, .linkedin-post-card, .case-study-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
            observer.observe(card);
        });

        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = `opacity 0.3s ease ${index * 0.08}s, transform 0.3s ease ${index * 0.08}s`;
            observer.observe(item);
        });
    }

    // ==========================================
    // 5. NAVBAR SCROLL BEHAVIOR
    // ==========================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = '#ffffff';
                navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
            }

            lastScroll = currentScroll;
        });
    }

    // ==========================================
    // 6. INTERACTIVE STATISTICS COUNTER
    // ==========================================
    function initStatisticsCounter() {
        const statsSection = document.createElement('section');
        statsSection.id = 'statistics';
        statsSection.className = 'statistics-section';
        statsSection.innerHTML = `
            <div class="container">
                <div class="row g-4 text-center">
                    <div class="col-md-3 col-6">
                        <div class="stat-item">
                            <h3 class="stat-number" data-target="5" data-plus="true">0</h3>
                            <p class="stat-label">Years Experience</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="stat-item">
                            <h3 class="stat-number" data-target="14">0</h3>
                            <p class="stat-label">Certifications</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="stat-item">
                            <h3 class="stat-number" data-target="20" data-plus="true">0</h3>
                            <p class="stat-label">Teams Led</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="stat-item">
                            <h3 class="stat-number" data-target="100">0</h3>
                            <p class="stat-label">Sprints Delivered</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert after About section
        const aboutSection = document.querySelector('#about');
        aboutSection.insertAdjacentElement('afterend', statsSection);

        // Add CSS for statistics
        const style = document.createElement('style');
        style.textContent = `
            .statistics-section {
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                padding: 60px 0;
            }
            .stat-item {
                padding: 2rem 1rem;
            }
            .stat-number {
                font-size: 3rem;
                font-weight: 700;
                color: #0d6efd;
                margin-bottom: 0.5rem;
            }
            .stat-label {
                font-size: 1rem;
                color: #6c757d;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);

        // Counter animation
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        const hasPlus = counter.getAttribute('data-plus') === 'true' || target >= 100;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + (hasPlus ? '+' : '');
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ==========================================
    // 7. CERTIFICATION FILTER
    // ==========================================
    function initCertificationFilter() {
        const certSection = document.querySelector('#certifications .container');
        const certRow = document.querySelector('#certifications .row');
        
        if (!certSection || !certRow) return;

        const filterButtons = document.createElement('div');
        filterButtons.className = 'cert-filters mb-4';
        filterButtons.innerHTML = `
            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <button class="btn btn-sm btn-outline-primary filter-btn active" data-filter="all">All</button>
                <button class="btn btn-sm btn-outline-primary filter-btn" data-filter="safe">SAFe</button>
                <button class="btn btn-sm btn-outline-primary filter-btn" data-filter="microsoft">Microsoft</button>
                <button class="btn btn-sm btn-outline-primary filter-btn" data-filter="infosys">Infosys</button>
                <button class="btn btn-sm btn-outline-primary filter-btn" data-filter="atlassian">Atlassian</button>
                <button class="btn btn-sm btn-outline-primary filter-btn" data-filter="other">Other</button>
            </div>
        `;

        certSection.insertBefore(filterButtons, certRow);

        const filterBtns = document.querySelectorAll('.filter-btn');
        const certCards = document.querySelectorAll('.cert-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                certCards.forEach(card => {
                    const issuer = card.querySelector('.cert-issuer').textContent.toLowerCase();
                    const title = card.querySelector('.cert-title').textContent.toLowerCase();
                    
                    let show = false;
                    if (filter === 'all') {
                        show = true;
                    } else if (filter === 'safe' && (issuer.includes('safe') || title.includes('safe'))) {
                        show = true;
                    } else if (filter === 'microsoft' && issuer.includes('microsoft')) {
                        show = true;
                    } else if (filter === 'infosys' && issuer.includes('infosys')) {
                        show = true;
                    } else if (filter === 'atlassian' && issuer.includes('atlassian')) {
                        show = true;
                    } else if (filter === 'other' && !issuer.includes('microsoft') && !issuer.includes('infosys') && !issuer.includes('safe') && !issuer.includes('atlassian')) {
                        show = true;
                    }

                    if (show) {
                        card.parentElement.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.parentElement.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }

    // ==========================================
    // 8. TESTIMONIALS HORIZONTAL SCROLL
    // ==========================================
    function initTestimonialsScroll() {
        const recommendationsSection = document.querySelector('#recommendations');
        if (!recommendationsSection) return;

        const row = recommendationsSection.querySelector('.row');
        if (!row) return;

        // Convert to horizontal scrollable layout
        row.style.display = 'flex';
        row.style.flexWrap = 'nowrap';
        row.style.overflowX = 'auto';
        row.style.overflowY = 'hidden';
        row.style.scrollBehavior = 'smooth';
        row.style.webkitOverflowScrolling = 'touch';
        row.style.paddingBottom = '1rem';
        row.style.gap = '1.5rem';
        row.style.scrollbarWidth = 'thin';
        row.style.scrollbarColor = '#0d6efd #f8f9fa';

        // Style scrollbar for webkit browsers
        const style = document.createElement('style');
        style.textContent = `
            #recommendations .row::-webkit-scrollbar {
                height: 8px;
            }
            #recommendations .row::-webkit-scrollbar-track {
                background: #f8f9fa;
                border-radius: 10px;
            }
            #recommendations .row::-webkit-scrollbar-thumb {
                background: #0d6efd;
                border-radius: 10px;
            }
            #recommendations .row::-webkit-scrollbar-thumb:hover {
                background: #0b5ed7;
            }
        `;
        document.head.appendChild(style);

        // Update column classes to fixed width
        const cards = row.querySelectorAll('.col-md-4');
        cards.forEach(card => {
            card.classList.remove('col-md-4');
            card.style.flex = '0 0 380px';
            card.style.maxWidth = '380px';
            card.style.minWidth = '380px';
        });
    }

    // ==========================================
    // 9. IMAGE LIGHTBOX FOR LINKEDIN POSTS
    // ==========================================
    function initImageLightbox() {
        const postImages = document.querySelectorAll('.linkedin-post-img');
        
        if (postImages.length === 0) return;

        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        `;
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img class="lightbox-image" src="" alt="">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 3rem;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10001;
        `;

        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;

        postImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 10. INTERACTIVE SKILL TAGS
    // ==========================================
    function initInteractiveSkills() {
        const skillTags = document.querySelectorAll('.skills-tags li');
        
        skillTags.forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.style.transition = 'all 0.3s ease';
            
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1)';
                tag.style.boxShadow = '0 4px 8px rgba(13, 110, 253, 0.3)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = 'none';
            });
        });
    }

    // ==========================================
    // INITIALIZE ALL FEATURES
    // ==========================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initScrollProgress();
        initBackToTop();
        initActiveNavigation();
        initScrollAnimations();
        initNavbarScroll();
        initStatisticsCounter();
        initCertificationFilter();
        initTestimonialsScroll();
        initImageLightbox();
        initInteractiveSkills();
    }

    // Start initialization
    init();

})();
