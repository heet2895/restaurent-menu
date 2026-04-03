document.addEventListener('DOMContentLoaded', () => {
    // 0. Loader Sequence
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // Simulate initial loading sequence
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading-state');

    }, 3800); // 3.8s loader



    // 2. Scroll Parallax for Hero
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
    });

    // 3. 3D Tilt Effect on Cards (Advanced Interaction)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        // Only apply tilt on desktop devices
        if(window.innerWidth > 1024) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                
                // Calculate rotation based on cursor position relative to center
                const multiplier = 10; // Intense rotation factor
                const xRotate = multiplier * ((y - rect.height / 2) / rect.height);
                const yRotate = -multiplier * ((x - rect.width / 2) / rect.width);
                
                const elements = card.querySelectorAll('.tilt-element');
                elements.forEach(el => {
                    // Slight variation in transform origin makes the depth pop
                    el.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                const elements = card.querySelectorAll('.tilt-element');
                elements.forEach(el => {
                    // Reset to resting translation config specific to their class
                    if(el.classList.contains('featured-info')) {
                        el.style.transform = 'rotateX(0) rotateY(0) translateZ(40px)';
                    } else if (el.classList.contains('featured-image-wrapper')) {
                        el.style.transform = 'rotateX(0) rotateY(0) translateZ(20px)';
                    } else {
                        el.style.transform = 'rotateX(0) rotateY(0)';
                    }
                });
            });
        }
    });


    // 4. Initialization via Intersection Observer
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => sectionObserver.observe(section));


    // 5. ScrollSpy / Active Navigation state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-category');

    const setActiveLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const scrollAdjustment = window.innerHeight * 0.3; 
            
            if (window.scrollY >= sectionTop - scrollAdjustment) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
                
                if (window.innerWidth <= 768) {
                    const nav = document.getElementById('main-nav');
                    const linkRect = link.getBoundingClientRect();
                    const navRect = nav.getBoundingClientRect();
                    
                    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
                        nav.scrollTo({
                            left: link.offsetLeft - navRect.width / 2 + linkRect.width / 2,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});
