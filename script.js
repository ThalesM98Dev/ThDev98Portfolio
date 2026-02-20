document.addEventListener('DOMContentLoaded', () => {
    // Theme initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

const navbar = document.getElementById("navbar");
const navLink = document.getElementById("navLink");
const mobileMenu = document.getElementById("mobileMenu");
const menuButton = document.getElementById("menuButton");

function openMenu() {
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(-16rem)';
        mobileMenu.style.visibility = 'visible';
        if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'true');
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu() {
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(0)';
        if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'false');
        }
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && menuButton && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        if (mobileMenu.style.transform === 'translateX(-18rem)') {
            closeMenu();
        }
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.style.transform === 'translateX(-18rem)') {
        closeMenu();
        if (menuButton) {
            menuButton.focus();
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        navbar.classList.add('bg-white', 'bg-opacity-80', 'backdrop-blur-lg', 'shadow-md', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    } else {
        navbar.classList.remove('bg-white', 'bg-opacity-80', 'backdrop-blur-lg', 'shadow-md', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    }
    
    lastScroll = currentScroll;
});

// Form submission handler (if needed)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        // For now, just show a success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Message Sent! ✓';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}