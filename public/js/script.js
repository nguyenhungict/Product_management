// Header Navigation Active State
document.addEventListener('DOMContentLoaded', function() {
    // Set active state for navigation links
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        try {
            if (link.href) {
                const linkPath = new URL(link.href).pathname;
                if (currentPath === linkPath || 
                    (currentPath.startsWith(linkPath) && linkPath !== '/')) {
                    link.classList.add('active');
                }
            }
        } catch (e) {
            // Skip if URL parsing fails
            console.log('Error parsing URL:', e);
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});