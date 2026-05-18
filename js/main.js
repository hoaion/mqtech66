/* main.js - Interaction logic */

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Segment Controls (Filtering)
    const segmentControls = document.querySelectorAll('.segment-btn');
    const filterableItems = document.querySelectorAll('[data-category]');

    if (segmentControls.length > 0) {
        segmentControls.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons in the same control group
                const group = e.target.closest('.segment-control');
                if (group) {
                    group.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
                }
                
                // Add active class to clicked button
                btn.classList.add('active');

                // Filter logic
                const targetCategory = btn.getAttribute('data-filter');
                
                if (targetCategory && filterableItems.length > 0) {
                    filterableItems.forEach(item => {
                        if (targetCategory === 'all' || item.getAttribute('data-category') === targetCategory) {
                            item.style.display = 'block'; // Or whatever display type is appropriate (flex, grid)
                            // Re-apply fade-in animation
                            item.classList.remove('animate-fade-in');
                            void item.offsetWidth; // Trigger reflow
                            item.classList.add('animate-fade-in');
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Catalog Search functionality
    const catalogSearch = document.getElementById('catalog-search');
    const documentCards = document.querySelectorAll('.document-card');

    if (catalogSearch && documentCards.length > 0) {
        catalogSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            documentCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
