// portfolio.js

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.toggle('fa-bars');
                    menuToggle.querySelector('i').classList.toggle('fa-times');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || 'User';

            // In a real implementation, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

            // Reset form
            this.reset();
        });
    }

    // Add active class to nav links based on scroll position
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

    // Add animation to elements when they come into view
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
});
// Add this to your portfolio.js file or create a new one

document.addEventListener('DOMContentLoaded', function() {
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
    generateFloatingIcons();
    generateParticles();

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
});