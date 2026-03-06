// script.js - MUSCLE FLEX (MK Fitness) Interactivity

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Page Load Animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 1.5 Hero Image Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const nextBtn = document.getElementById('sliderNext');
    const prevBtn = document.getElementById('sliderPrev');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.zIndex = '0';
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.zIndex = '1';
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlide = () => {
            slideInterval = setInterval(nextSlide, 2000); // 2-second auto-slide
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            // Pause for a moment after manual click, then restart
            setTimeout(startSlide, 3000);
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        startSlide();
    }

    // 2. Scroll Navbar Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2.5 Active Navigation Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        // Skip the 'Join Now' button so it keeps its distinct styling
        if (link.classList.contains('btn')) return;

        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            // Ensure no other link has active state
            link.classList.remove('active');
        }
    });

    // 3. Mobile Navigation Scroll
    const navContainer = document.querySelector('.nav-scroll-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (navContainer && scrollLeftBtn && scrollRightBtn) {
        // Scroll amount per click
        const scrollAmount = 150;

        scrollLeftBtn.addEventListener('click', () => {
            navContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            navContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Optional: Hide arrows if scroll isn't needed or at the ends
        const handleScrollBtns = () => {
            // Using a small buffer for precision
            const maxScrollLeft = navContainer.scrollWidth - navContainer.clientWidth;
            scrollLeftBtn.style.opacity = navContainer.scrollLeft > 0 ? "1" : "0.3";
            scrollRightBtn.style.opacity = navContainer.scrollLeft >= maxScrollLeft - 1 ? "0.3" : "1";
        };

        navContainer.addEventListener('scroll', handleScrollBtns);
        window.addEventListener('resize', handleScrollBtns);
        // Initial check
        setTimeout(handleScrollBtns, 100);
    }

    // 4. Scroll triggered fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    // 5. BMI Calculator Logic (Home Page)
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const heightCm = parseFloat(document.getElementById('bmi-height').value);
            const weightKg = parseFloat(document.getElementById('bmi-weight').value);
            const resultBox = document.getElementById('bmi-result');

            if (heightCm > 0 && weightKg > 0) {
                const heightM = heightCm / 100;
                const bmi = (weightKg / (heightM * heightM)).toFixed(1);

                let category = '';
                let tip = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    tip = 'Focus on caloric surplus and strength training.';
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    category = 'Normal';
                    tip = 'Maintain your balanced routine and healthy diet.';
                } else if (bmi >= 25 && bmi <= 29.9) {
                    category = 'Overweight';
                    tip = 'Incorporate daily cardio and a slight caloric deficit.';
                } else {
                    category = 'Obese';
                    tip = 'Consult with our trainers for a guided transformation plan.';
                }

                resultBox.innerHTML = `
                    <div style="background: rgba(211, 84, 0,0.1); border-left: 4px solid var(--accent-purple); padding: 15px; border-radius: 4px; margin-top: 15px;">
                        <span style="font-size: 24px; font-weight: 800; color: var(--text-white); display: block;">${bmi}</span>
                        <strong style="color: var(--accent-purple);">${category}</strong>
                        <p style="margin: 5px 0 0; font-size: 14px;">${tip}</p>
                    </div>
                `;
            }
        });
    }

});

