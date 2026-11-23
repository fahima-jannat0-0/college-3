/* ==========================================
   SRABON COLLEGE WEBSITE - JAVASCRIPT FILE
   ==========================================
   This file handles all the interactive parts:
   1. Navbar scroll effect
   2. Mobile menu toggle
   3. Gallery filter
   4. Stats counter animation
   5. Scroll animations
   6. Form submission
   ========================================== */


// ========== 1. NAVBAR SCROLL EFFECT ==========
// Makes the navbar smaller and darker when you scroll down

window.addEventListener('scroll', function () {
    // Get the navbar element
    var navbar = document.getElementById('navbar');

    // If scrolled more than 50 pixels, add "scrolled" class
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ========== 2. MOBILE MENU TOGGLE ==========
// Shows/hides the navigation menu on mobile phones

function toggleMenu() {
    // Get the nav links
    var navLinks = document.getElementById('nav-links');

    // Toggle the "active" class (show/hide)
    navLinks.classList.toggle('active');
}

// Close mobile menu when a link is clicked
var allNavLinks = document.querySelectorAll('.nav-links a');

for (var i = 0; i < allNavLinks.length; i++) {
    allNavLinks[i].addEventListener('click', function () {
        var navLinks = document.getElementById('nav-links');
        navLinks.classList.remove('active');
    });
}


// ========== 3. GALLERY FILTER ==========
// Filters gallery images by category (All, Campus, Academic, Facilities)

function filterGallery(category) {
    // Get all gallery cards
    var cards = document.querySelectorAll('.gallery-card');

    // Loop through each card
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var cardCategory = card.getAttribute('data-category');

        // Show card if it matches the category, or if "all" is selected
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    }

    // Update active button style
    var buttons = document.querySelectorAll('.filter-btn');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    // Find the clicked button and make it active
    event.target.classList.add('active');
}


// ========== 4. STATS COUNTER ANIMATION ==========
// Counts up numbers (e.g., 0 → 5000) when they appear on screen

function animateCounters() {
    // Get all stat number elements
    var counters = document.querySelectorAll('.stat-number');

    for (var i = 0; i < counters.length; i++) {
        var counter = counters[i];
        var target = parseInt(counter.getAttribute('data-target'));
        var current = parseInt(counter.innerText);

        // If counter hasn't reached its target yet
        if (current < target) {
            // Calculate how much to add each step
            var step = Math.ceil(target / 100);

            // Update the number
            counter.innerText = Math.min(current + step, target);
        }
    }
}

// Variable to track if counter animation has started
var countersStarted = false;

// Check if stats section is visible on screen
window.addEventListener('scroll', function () {
    var statsSection = document.querySelector('.stats');

    if (statsSection) {
        var position = statsSection.getBoundingClientRect();

        // If stats section is visible and animation hasn't started
        if (position.top < window.innerHeight && position.bottom > 0 && !countersStarted) {
            countersStarted = true;

            // Run the counter animation repeatedly until done
            var counterInterval = setInterval(function () {
                animateCounters();

                // Check if all counters are done
                var allDone = true;
                var counters = document.querySelectorAll('.stat-number');
                for (var i = 0; i < counters.length; i++) {
                    var target = parseInt(counters[i].getAttribute('data-target'));
                    var current = parseInt(counters[i].innerText);
                    if (current < target) {
                        allDone = false;
                    }
                }

                // Stop the interval when all counters are done
                if (allDone) {
                    clearInterval(counterInterval);
                }
            }, 20); // Run every 20 milliseconds
        }
    }
});


// ========== 5. SCROLL FADE-IN ANIMATION ==========
// Makes sections fade in as you scroll down to them

// Add "fade-in" class to all main sections
window.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.gallery, .courses, .admission, .stats');

    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add('fade-in');
    }
});

// Check which sections are visible and add "visible" class
window.addEventListener('scroll', function () {
    var fadeElements = document.querySelectorAll('.fade-in');

    for (var i = 0; i < fadeElements.length; i++) {
        var element = fadeElements[i];
        var position = element.getBoundingClientRect();

        // If element is in the viewport (visible area)
        if (position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    }
});


// ========== 6. FORM SUBMISSION ==========
// Handles the admission form when submitted

function handleFormSubmit(event) {
    // Prevent the page from reloading
    event.preventDefault();

    // Get the form and success message elements
    var form = document.getElementById('admission-form');
    var successMessage = document.getElementById('success-message');

    // Get form values
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Simple validation - check if required fields are filled
    if (firstName && lastName && email && phone) {
        // Hide the form
        form.style.display = 'none';

        // Show success message
        successMessage.style.display = 'block';

        // Show an alert with the applicant's name
        alert('Thank you, ' + firstName + ' ' + lastName + '! Your application has been submitted.');
    }
}


// ========== 7. TRIGGER ANIMATIONS ON PAGE LOAD ==========
// Run scroll check once on page load (in case sections are already visible)

window.addEventListener('load', function () {
    // Trigger scroll event to check for visible sections
    window.dispatchEvent(new Event('scroll'));
});
