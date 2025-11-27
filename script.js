document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Simple Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Solar Calculator Logic
    const billSlider = document.getElementById('bill-slider');
    const billDisplay = document.getElementById('bill-display');
    const systemSizeDisplay = document.getElementById('system-size');
    const annualSavingsDisplay = document.getElementById('annual-savings');
    const projectCostDisplay = document.getElementById('project-cost');

    function calculateSolar() {
        const monthlyBill = parseInt(billSlider.value);
        billDisplay.textContent = monthlyBill.toLocaleString('en-IN');

        // Assumptions:
        // Avg cost per unit: ₹8
        // 1 kW generates ~120 units/month
        // Cost per kW: ~₹60,000

        const unitsConsumed = monthlyBill / 8;
        const requiredSystemSize = unitsConsumed / 120;

        // Round to 1 decimal place
        const systemSize = Math.ceil(requiredSystemSize * 10) / 10;

        // Annual Savings = Monthly Bill * 12 (assuming 100% offset for simplicity in estimation)
        const annualSavings = monthlyBill * 12;

        // Project Cost
        const projectCost = systemSize * 60000;

        systemSizeDisplay.textContent = systemSize.toFixed(1);
        annualSavingsDisplay.textContent = annualSavings.toLocaleString('en-IN');
        projectCostDisplay.textContent = projectCost.toLocaleString('en-IN');
    }

    if (billSlider) {
        billSlider.addEventListener('input', calculateSolar);
        // Initial calculation
        calculateSolar();
    }
});
