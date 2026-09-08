// Raghim AI Enterprise Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add lightweight docs metadata chips for stronger trust framing.
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader && !document.querySelector('.doc-meta')) {
        const meta = document.createElement('div');
        meta.className = 'doc-meta';
        meta.innerHTML = [
            '<span class="doc-chip">Platform v2.0.20</span>',
            '<span class="doc-chip">Enterprise Docs</span>',
            '<span class="doc-chip">Updated 2026</span>'
        ].join('');
        pageHeader.appendChild(meta);
    }

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Sidebar TOC active highlighting for docs pages.
    function updateActiveToc() {
        const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
        if (!tocLinks.length) return;
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const scrollPos = window.scrollY + 160;
        let activeId = null;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) activeId = section.id;
        });
        tocLinks.forEach(link => {
            const isActive = activeId && link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('active', Boolean(isActive));
        });
    }

    // Throttled scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            updateActiveToc();
        }, 10);
    });
    updateActiveToc();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.overview-card, .feature-item, .deployment-card, .security-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Copy code functionality (for future API examples)
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.className = 'copy-btn';
            copyButton.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            const pre = block.parentElement;
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
            
            pre.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }

    // Initialize copy buttons
    addCopyButtons();

    // Search functionality (for future implementation)
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const searchableElements = document.querySelectorAll('.feature-item, .overview-card, .api-section');
                
                searchableElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(query)) {
                        element.style.display = 'block';
                    } else {
                        element.style.display = 'none';
                    }
                });
            });
        }
    }

    // Initialize search
    initializeSearch();

    // Theme toggle (for future dark mode implementation)
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            }
        }
    }

    // Initialize theme toggle
    initializeThemeToggle();

    // Performance monitoring
    function logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    // Initialize performance monitoring
    logPerformanceMetrics();

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Could send error reports to analytics service
    });

    // Accessibility improvements
    function improveAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Initialize accessibility improvements
    improveAccessibility();

    // Print functionality
    function initializePrint() {
        const printButton = document.getElementById('print-button');
        if (printButton) {
            printButton.addEventListener('click', function() {
                window.print();
            });
        }
    }

    // Initialize print functionality
    initializePrint();

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
        
        // Ctrl/Cmd + K for search (future implementation)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Lazy loading for images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    initializeLazyLoading();

    // Console welcome message
    console.log('%cRaghim AI Enterprise Agent Platform', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cDocumentation v2.0.20', 'color: #64748b; font-size: 12px;');
    console.log('%cBuilt with ❤️ for enterprise AI solutions', 'color: #10b981; font-size: 12px;');
});






