/**
 * Insights Filter JavaScript for Financial Risk Management Consulting Website
 * Handles filtering and display of insights/blog posts
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize insights filter functionality
    initInsightsFilter();
    
    // Initialize load more functionality
    initLoadMore();
});

/**
 * Initialize insights filter functionality
 */
function initInsightsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const insightCards = document.querySelectorAll('.insight-card');
    
    if (!filterButtons.length || !insightCards.length) return;
    
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
            
            // Show/hide insight cards based on category
            insightCards.forEach(card => {
                if (filterCategory === 'all' || card.getAttribute('data-category') === filterCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset load more button state
            resetLoadMore();
        });
    });
}

/**
 * Initialize load more functionality for insights
 */
function initLoadMore() {
    const loadMoreButton = document.querySelector('.load-more .btn');
    const insightCards = document.querySelectorAll('.insight-card');
    
    if (!loadMoreButton || !insightCards.length) return;
    
    // Set initial number of visible cards
    const initialVisibleCount = 6;
    let visibleCount = initialVisibleCount;
    
    // Hide cards beyond initial count
    insightCards.forEach((card, index) => {
        if (index >= initialVisibleCount) {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
    
    // Update load more button visibility
    updateLoadMoreButton();
    
    // Add click event listener to load more button
    loadMoreButton.addEventListener('click', () => {
        // Show next batch of cards
        const nextBatchSize = 3;
        let shown = 0;
        
        insightCards.forEach((card, index) => {
            if (card.classList.contains('hidden') && 
                !card.style.display === 'none' && 
                shown < nextBatchSize) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                shown++;
                visibleCount++;
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
        
        // Smooth scroll to newly visible cards
        if (shown > 0) {
            const lastVisibleCard = Array.from(insightCards).find((card, index) => 
                index === visibleCount - shown - 1
            );
            
            if (lastVisibleCard) {
                window.scrollTo({
                    top: lastVisibleCard.offsetTop + lastVisibleCard.offsetHeight - 50,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    /**
     * Update load more button visibility based on remaining hidden cards
     */
    function updateLoadMoreButton() {
        const hiddenCards = document.querySelectorAll('.insight-card.hidden');
        
        if (hiddenCards.length === 0) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'inline-block';
        }
    }
    
    /**
     * Reset load more functionality after filtering
     */
    function resetLoadMore() {
        visibleCount = initialVisibleCount;
        
        // Reset visibility based on current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterCategory = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        let visibleCounter = 0;
        
        insightCards.forEach((card, index) => {
            const matchesFilter = filterCategory === 'all' || card.getAttribute('data-category') === filterCategory;
            
            if (matchesFilter) {
                if (visibleCounter < initialVisibleCount) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    visibleCounter++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
    }
}

/**
 * Initialize white paper download functionality
 */
function initWhitePaperDownloads() {
    const downloadButtons = document.querySelectorAll('.white-paper-card .btn');
    
    if (!downloadButtons.length) return;
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get white paper title
            const paperTitle = this.closest('.white-paper-card').querySelector('.paper-title').textContent;
            
            // Show download confirmation
            alert(`Thank you for your interest in "${paperTitle}". In a real implementation, this would trigger a download or a form to collect your information before providing the white paper.`);
        });
    });
}

// Initialize white paper downloads
document.addEventListener('DOMContentLoaded', initWhitePaperDownloads);

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    
    if (!searchIcon) return;
    
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        
        // Create search form
        const searchForm = document.createElement('div');
        searchForm.className = 'search-form';
        searchForm.innerHTML = `
            <div class="search-header">
                <h2>Search</h2>
                <button class="close-search"><i class="fas fa-times"></i></button>
            </div>
            <div class="search-input-container">
                <input type="text" class="search-input" placeholder="Search for insights, services, or case studies...">
                <button class="search-button"><i class="fas fa-search"></i></button>
            </div>
        `;
        
        // Add search form to overlay
        searchOverlay.appendChild(searchForm);
        
        // Add overlay to body
        document.body.appendChild(searchOverlay);
        
        // Focus on search input
        setTimeout(() => {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
        
        // Add close button event listener
        const closeButton = document.querySelector('.close-search');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                document.body.removeChild(searchOverlay);
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', function escapeClose(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(searchOverlay)) {
                    document.body.removeChild(searchOverlay);
                }
                document.removeEventListener('keydown', escapeClose);
            }
        });
        
        // Close on overlay click (but not form click)
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                document.body.removeChild(searchOverlay);
            }
        });
        
        // Handle search form submission
        const searchButton = document.querySelector('.search-button');
        if (searchButton) {
            searchButton.addEventListener('click', handleSearch);
        }
        
        const searchInputField = document.querySelector('.search-input');
        if (searchInputField) {
            searchInputField.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }
        
        function handleSearch() {
            const searchValue = document.querySelector('.search-input').value.trim();
            if (searchValue) {
                // In a real implementation, this would search the site content
                alert(`Search functionality would be implemented here for: "${searchValue}"`);
                
                // Close the search overlay
                if (document.body.contains(searchOverlay)) {
                    document.body.removeChild(searchOverlay);
                }
            }
        }
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', initSearch);
