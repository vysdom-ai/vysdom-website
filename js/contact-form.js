/**
 * Contact Form JavaScript for Financial Risk Management Consulting Website
 * Handles form validation and submission
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form validation
    initContactForm();
    
    // Initialize newsletter form validation
    initNewsletterForm();
});

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(contactForm)) {
            // Simulate form submission (would be replaced with actual AJAX submission)
            simulateFormSubmission(contactForm);
        }
    });
    
    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

/**
 * Initialize newsletter form validation and submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(newsletterForm)) {
            // Simulate form submission (would be replaced with actual AJAX submission)
            simulateNewsletterSubmission(newsletterForm);
        }
    });
}

/**
 * Validate an individual form input
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    let isValid = true;
    const errorClass = 'error';
    
    // Remove any existing error messages
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error class
    input.classList.remove(errorClass);
    
    // Check if the input is required and empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        showError(input, 'This field is required');
    }
    
    // Validate email format
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        }
    }
    
    // Validate phone format (optional field)
    if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(input.value.trim())) {
            isValid = false;
            showError(input, 'Please enter a valid phone number');
        }
    }
    
    return isValid;
}

/**
 * Show error message for an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showError(input, message) {
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert error message after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Simulate contact form submission (would be replaced with actual AJAX submission)
 * @param {HTMLFormElement} form - The form to submit
 */
function simulateFormSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate AJAX delay
    setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully. We will contact you shortly.';
        
        // Insert success message before form
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }, 1500);
}

/**
 * Simulate newsletter form submission (would be replaced with actual AJAX submission)
 * @param {HTMLFormElement} form - The form to submit
 */
function simulateNewsletterSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate AJAX delay
    setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing to our newsletter!';
        
        // Insert success message before form
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }, 1500);
}
