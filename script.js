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

    // 6. Dietary Filters Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.filter-item');
    let activeFilters = new Set();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                btn.classList.remove('active');
            } else {
                activeFilters.add(filter);
                btn.classList.add('active');
            }
            
            menuItems.forEach(item => {
                if (activeFilters.size === 0) {
                    item.classList.remove('hidden-by-filter');
                    return;
                }
                
                const itemDiet = (item.getAttribute('data-diet') || "").split(',');
                let match = true;
                for (let reqFilter of activeFilters) {
                    if (!itemDiet.includes(reqFilter)) {
                        match = false;
                        break;
                    }
                }
                
                if (match) {
                    item.classList.remove('hidden-by-filter');
                } else {
                    item.classList.add('hidden-by-filter');
                }
            });
        });
    });

    // 7. Interactive Story Accordion
    const storyToggles = document.querySelectorAll('.story-toggle');
    storyToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.interactive-story');
            parent.classList.toggle('expanded');
        });
    });

    // 8. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const toggleTheme = () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.body.removeAttribute('data-theme');
                themeBtn.textContent = '☀';
                localStorage.setItem('aura_theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeBtn.textContent = '☾';
                localStorage.setItem('aura_theme', 'light');
            }
        }
        themeBtn.addEventListener('click', toggleTheme);
        if (localStorage.getItem('aura_theme') === 'light') {
            document.body.setAttribute('data-theme', 'light');
            themeBtn.textContent = '☾';
        }
    }

    // 9. Shortlist Logic
    let shortlist = JSON.parse(localStorage.getItem('aura_shortlist')) || [];
    const shortlistFab = document.getElementById('shortlist-fab');
    const shortlistCount = document.getElementById('shortlist-count');

    const updateFab = () => {
        if (!shortlistFab) return;
        shortlistCount.textContent = shortlist.length;
        if (shortlist.length > 0) {
            shortlistFab.classList.remove('hidden');
        } else {
            shortlistFab.classList.add('hidden');
        }
        localStorage.setItem('aura_shortlist', JSON.stringify(shortlist));
    }

    // Inject Shortlist button dynamically
    const injectShortlistButtons = () => {
        const targets = document.querySelectorAll('.dish-name, .tasting-wrapper h3, .featured-info h2');
        targets.forEach(target => {
            const btn = document.createElement('button');
            btn.className = 'add-shortlist-btn';
            btn.innerHTML = '★';
            btn.title = 'Add to Shortlist';
            
            const rawName = target.textContent.trim();
            if (!rawName) return;
            
            // Remove '★' from the rawName if it gets accidentally captured later
            const dishName = rawName.replace('★', '').trim();
            
            if (shortlist.includes(dishName)) {
                btn.classList.add('saved');
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (shortlist.includes(dishName)) {
                    shortlist = shortlist.filter(i => i !== dishName);
                    btn.classList.remove('saved');
                } else {
                    shortlist.push(dishName);
                    btn.classList.add('saved');
                }
                updateFab();
            });

            target.appendChild(btn);
        });
    }

    injectShortlistButtons();
    updateFab();

});
