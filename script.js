// portfolio.js - Complete File

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

        // Change icon
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Menu toggle click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        toggleMenu();
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ============================================
    // 2. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. ACTIVE NAV LINK ON SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 4. SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements to animate
    document.querySelectorAll('.project-card, .certification-card, .education-item').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .certification-card, .education-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate-in, 
        .certification-card.animate-in, 
        .education-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // 5. FORM SUBMISSION WITH FORMSUBMIT.CO
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoader = submitBtn?.querySelector('.btn-loader');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            // IMPORTANT: Remove e.preventDefault() to allow FormSubmit.co to work
            // e.preventDefault(); // COMMENT THIS OUT OR REMOVE IT

            // Show loading state
            if (submitBtn && btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'flex';
                submitBtn.disabled = true;
            }

            // Hide any previous messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';

            try {
                // For FormSubmit.co, we should let the form submit normally
                // But we still want to show loading state

                // The form will submit normally to FormSubmit.co
                // No need for fetch() when using FormSubmit.co

                // Show success message immediately (FormSubmit will handle the actual submission)
                if (formSuccess) {
                    formSuccess.style.display = 'flex';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Reset button state after a delay
                setTimeout(() => {
                    if (submitBtn && btnText && btnLoader) {
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (formSuccess) formSuccess.style.display = 'none';
                    }, 5000);

                    // Reset form after submission
                    this.reset();
                }, 1500);

            } catch (error) {
                console.error('Form submission error:', error);

                // Show error message
                if (formError) {
                    formError.style.display = 'flex';
                    formError.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Reset button state
                    if (submitBtn && btnText && btnLoader) {
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }

                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        formError.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }

    // ============================================
    // 6. FLOATING TECH ICONS BACKGROUND
    // ============================================
    // Tech/ML/AI related emojis and icons
    const techIcons = [
        '🤖', '🧠', '⚡', '💻', '📊', '📈', '🔬', '🧮', '🔢', '🧪',
        '📡', '🖥️', '💾', '🧬', '🔍', '🎯', '🔮', '💡', '🔧', '⚙️',
        '🔄', '📱', '🌐', '🛠️', '🎮', '🚀', '💎', '🎲', '🔐', '🔗',
        '🧩', '🎪', '🏆', '🎨', '✨', '🌟', '💫', '☄️', '🌌', '🪐'
    ];

    // Tech/ML specific icons (Font Awesome classes)
    const techIconClasses = [
        'fas fa-robot', 'fas fa-brain', 'fas fa-microchip', 'fas fa-code',
        'fas fa-database', 'fas fa-chart-line', 'fas fa-cogs', 'fas fa-network-wired',
        'fas fa-server', 'fas fa-laptop-code', 'fas fa-cloud', 'fas fa-magic',
        'fas fa-bolt', 'fas fa-filter', 'fas fa-project-diagram', 'fas fa-stream',
        'fas fa-sitemap', 'fas fa-cube', 'fas fa-shield-alt', 'fas fa-key'
    ];

    // Get containers
    const floatingIconsContainer = document.getElementById('floating-icons');
    const particlesContainer = document.getElementById('particles');

    // Generate floating icons
    function generateFloatingIcons() {
        const numIcons = 40;

        for (let i = 0; i < numIcons; i++) {
            const icon = document.createElement('div');
            icon.classList.add('icon');

            // Randomly choose between emoji and font awesome icon
            if (Math.random() > 0.5) {
                // Use emoji
                icon.textContent = techIcons[Math.floor(Math.random() * techIcons.length)];

                // Add category class for styling
                if (Math.random() > 0.66) {
                    icon.classList.add('ai');
                } else if (Math.random() > 0.33) {
                    icon.classList.add('ml');
                } else {
                    icon.classList.add('data');
                }
            } else {
                // Use Font Awesome icon
                const iconClass = techIconClasses[Math.floor(Math.random() * techIconClasses.length)];
                icon.innerHTML = `<i class="${iconClass}"></i>`;
                icon.classList.add('code');
            }

            // Random positioning
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;

            // Random animation delay
            icon.style.animationDelay = `${Math.random() * 20}s`;

            floatingIconsContainer.appendChild(icon);
        }
    }

    // Generate particles
    function generateParticles() {
        const numParticles = 60;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;

            // Random opacity
            particle.style.opacity = `${0.05 + Math.random() * 0.1}`;

            particlesContainer.appendChild(particle);
        }
    }

    // Generate both floating icons and particles
    if (floatingIconsContainer) generateFloatingIcons();
    if (particlesContainer) generateParticles();

    // Add interactive effect - icons become more visible when hovering over sections
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            const icons = document.querySelectorAll('.icon');
            icons.forEach(icon => {
                if (this.contains(icon)) return;

                // Randomly brighten some icons
                if (Math.random() > 0.7) {
                    icon.style.opacity = '0.25';
                    icon.style.filter = 'blur(0px)';

                    // Return to normal after 2 seconds
                    setTimeout(() => {
                        icon.style.opacity = '';
                        icon.style.filter = '';
                    }, 2000);
                }
            });
        });
    });

    // Add occasional sparkle effect to random icons
    function sparkleEffect() {
        const icons = document.querySelectorAll('.icon');
        if (icons.length === 0) return;

        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        // Create sparkle effect
        randomIcon.style.opacity = '0.4';
        randomIcon.style.transform = 'scale(1.5)';
        randomIcon.style.filter = 'blur(0px) drop-shadow(0 0 8px var(--accent-color))';

        // Return to normal after 1 second
        setTimeout(() => {
            randomIcon.style.opacity = '';
            randomIcon.style.transform = '';
            randomIcon.style.filter = '';
        }, 1000);

        // Schedule next sparkle
        setTimeout(sparkleEffect, 3000 + Math.random() * 5000);
    }

    // Start sparkle effect after a delay
    setTimeout(sparkleEffect, 5000);
// Select both classes at once
    document.querySelectorAll('.project-card, .certification-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            console.log('Mouse ENTERED card:', this);
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 10px 30px rgba(0, 238, 255, 0.1)';
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            console.log('Mouse LEFT card:', this);
            this.style.transform = '';
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });

    // ============================================
    // 8. FORM VALIDATION (ADDITIONAL)
    // ============================================
    if (contactForm) {
        // Add input validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });

            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = 'var(--accent-color)';
                }
            });
        });
    }

    // ============================================
    // 9. YEAR UPDATE IN FOOTER (OPTIONAL)
    // ============================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // 10. PREVENT EMPTY FORM SUBMISSION DEBUG
    // ============================================
    if (contactForm) {
        // Debug: Log form data before submission
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;

            console.log('Form submission attempt with:', { name, email, message });

            // Optional: Validate before allowing submission
            if (!name || !email || !message) {
                alert('Please fill in all fields before submitting.');
                e.preventDefault();
                return false;
            }

            // IMPORTANT: Comment out or remove this line to allow FormSubmit.co to work
            // e.preventDefault(); // REMOVE OR COMMENT THIS LINE
        });
    }
});

// ============================================
// LOADING STATE FOR PAGE
// ============================================
window.addEventListener('load', function() {
    // Remove loading class if you have one
    document.body.classList.remove('loading');

    // Fade in animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(el => {
            el.classList.add('animate-in');
        });
    }, 100);
});