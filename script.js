// --- Global Elements ---
const body = document.body;
const nav = document.getElementById('mainNav');
const sidebar = document.getElementById('sidebar');
const contentWrapper = document.getElementById('contentWrapper');

// --- Mobile Navigation Toggle (Hamburger) ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// --- Sidebar Toggle Logic ---
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function closeSidebar() {
    sidebar.classList.remove('open');
    body.classList.remove('body-sidebar-open');
}

function openSidebar() {
    sidebar.classList.add('open');
    body.classList.add('body-sidebar-open');
}

sidebarToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close sidebar when clicking a link inside it
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});


// --- Smooth scrolling for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's not the sidebar being closed (which calls closeSidebar before scroll)
        if (this.classList.contains('sidebar-link')) {
            // Let the link scroll, but ensure the sidebar is closed
            // closeSidebar() is already handled by the event listener above
        } else {
            e.preventDefault();
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjusted offset for fixed nav
            const offsetTop = target.offsetTop - 90; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- Add scroll effect to navigation ---
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Apply a deeper shadow when scrolling down
    if (currentScroll > 0) {
        nav.style.boxShadow = '0 6px 25px rgba(31, 66, 32, 0.2)';
    } else {
        nav.style.boxShadow = '0 4px 15px rgba(31, 66, 32, 0.1)';
    }
});

// --- Intersection Observer for fade-in animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Stop observing once it has appeared
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and feature items
document.querySelectorAll('.card, .feature-item, .rounded-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});


// --- Auto-Moving Carousel Logic ---
const carousel = document.getElementById('hero-carousel');
const carouselInner = carousel.querySelector('.carousel-inner');
const items = carousel.querySelectorAll('.carousel-item');
const prevButton = carousel.querySelector('.prev');
const nextButton = carousel.querySelector('.next');
let currentIndex = 0;
let intervalId;
const intervalTime = 5000; // Change slide every 5 seconds

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove('active');
        // FIX: Ensure inactive slides are set to a low z-index via JS style
        item.style.zIndex = 1; 

        if (index === currentIndex) {
            item.classList.add('active');
            // FIX: Ensure active slide is set to a high z-index via JS style
            item.style.zIndex = 10; 
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

function startAutoSlide() {
    // Clear any existing interval before starting a new one
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(nextSlide, intervalTime);
}

// Event Listeners for controls
nextButton.addEventListener('click', () => {
    nextSlide();
    startAutoSlide(); // Restart the timer after manual click
});

prevButton.addEventListener('click', () => {
    prevSlide();
    startAutoSlide(); // Restart the timer after manual click
});

// Initialize carousel and start automatic movement
updateCarousel();
startAutoSlide();