/**
 * Carousel JavaScript for Financial Risk Management Consulting Website
 * Handles testimonial carousel and other slider functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    // Initialize any other carousels
    initCaseStudiesCarousel();
});

/**
 * Initialize testimonial carousel functionality
 */
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const items = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (!carousel || !items.length) return;
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Hide all items except the first one
    items.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected item
        items[index].style.display = 'block';
        
        // Add active class to the corresponding indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Update current index
        currentIndex = index;
    }
    
    // Function to show the next slide
    function showNextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalItems) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Function to show the previous slide
    function showPrevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalItems - 1;
        }
        showSlide(prevIndex);
    }
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Add click event listeners to prev/next buttons
    if (prevButton) {
        prevButton.addEventListener('click', showPrevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', showNextSlide);
    }
    
    // Auto-advance slides every 5 seconds
    let autoSlideInterval = setInterval(showNextSlide, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto-advance when mouse leaves
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(showNextSlide, 5000);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPrevSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        }
    });
    
    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            showNextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            showPrevSlide();
        }
    }
}

/**
 * Initialize case studies carousel/filter functionality
 */
function initCaseStudiesCarousel() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    if (!filterButtons.length || !caseStudyCards.length) return;
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filterCategory = button.getAttribute('data-filter');
            
            // Show/hide case study cards based on category
            caseStudyCards.forEach(card => {
                if (filterCategory === 'all' || card.getAttribute('data-category') === filterCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
