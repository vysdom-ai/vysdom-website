/**
 * Main JavaScript file for Financial Risk Management Consulting Website
 * Handles core functionality including navigation, animations, and general interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Set current year in footer copyright
    setCurrentYear();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add active class to current navigation item
    highlightCurrentPage();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            }
        });
    }
}

/**
 * Set current year in footer copyright
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add active class to current navigation item based on URL
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the link path is in the current URL path
        if (currentPath.includes(linkPath) && linkPath !== '../index.html' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && 
                  (linkPath === 'index.html' || linkPath === '../index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Reveal elements on scroll with animation
 * @param {string} selector - CSS selector for elements to animate
 */
function revealOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    
    if (!elements.length) return;
    
    const revealElement = function() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealElement();
    
    // Check on scroll
    window.addEventListener('scroll', revealElement);
}

/**
 * Initialize animations for page elements
 */
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.service-card, .insight-card, .testimonial-item, .value-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Trigger animations on scroll
    revealOnScroll('.animate-on-scroll');
}

// Initialize animations after page load
window.addEventListener('load', initAnimations);
