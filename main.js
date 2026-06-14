// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // 1. Preloader Animation
    const preloaderName = document.querySelector(".preloader-name");
    if (preloaderName) {
        const text = preloaderName.textContent;
        preloaderName.innerHTML = "";
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.className = "char";
            preloaderName.appendChild(span);
        });
    }

    const preloader = document.getElementById("preloader");
    const landscapeLine = document.querySelector(".landscape-line");
    const leaves = document.querySelectorAll(".leaf");
    const chars = document.querySelectorAll(".char");
    const glow = document.querySelector(".glow-effect");

    // Initialize Particles for Preloader
    if (window.particlesJS && document.getElementById("preloader-particles")) {
        particlesJS("preloader-particles", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#C8A24D", "#A8BC9B"] }, // Gold and Sage
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "retina_detect": true
        });
    }

    const preloaderTimeline = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = "none";
                }
            });
            // Enhance the hero reveal motion
            gsap.fromTo(".hero-bg",
                { scale: 1.1 },
                { scale: 1, duration: 2, ease: "power2.out" }
            );
            initHeroAnimations();
        }
    });

    preloaderTimeline
        .to(landscapeLine, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" })
        .to(glow, { opacity: 1, duration: 1.5 }, "-=1.5")
        .to(leaves, { opacity: 1, scale: 1, duration: 1, stagger: 0.3, ease: "back.out(1.7)" }, "-=1.5")
        .to(chars, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, stagger: 0.04, ease: "power2.out" }, "-=1")
        .to(landscapeLine, { opacity: 0, y: -20, duration: 1, delay: 0.7 }, "+=0.3")
        .to(leaves, { opacity: 0, y: -20, duration: 1 }, "-=1")
        .to(chars, { opacity: 0, y: -20, filter: "blur(5px)", duration: 0.8, stagger: 0.02 }, "-=0.8")
        .to(glow, { opacity: 0, duration: 0.8 }, "-=0.5");

    // 2. Header Sticky Effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Hamburger Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("open");
        });

        // Close nav when a link is clicked
        mainNav.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mainNav.classList.remove("open");
            });
        });
    }

    // 3. Hero Animations
    function initHeroAnimations() {
        gsap.to(".hero-title", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        gsap.to(".hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.to(".hero-content .btn-primary", {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: "power3.out"
        });
    }

    // 4. Parallax Effect for Hero BG
    gsap.to(".hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 5. About Section Animations
    gsap.from(".about-image", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Services & General Fade Up
    const fadeUpElements = gsap.utils.toArray('.service-card, .why-card, .testimonial-card, .contact-info, .contact-form, .project-item');
    fadeUpElements.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // 7. Init Particles
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 30,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#C8A24D" // Gold Accent
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "top",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 200,
                        "size": 4,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    }
                }
            },
            "retina_detect": true
        });
    }

    // 8. Testimonial Slider Logic
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotContainer = document.querySelector('.slider-dots');

    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotContainer.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.dot'));

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
            resetInterval();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Auto slide
        resetInterval();

        // Support for swipe
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        }, { passive: true });

        function handleGesture() {
            if (touchStartX - touchEndX > 50) {
                nextSlide();
                resetInterval();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
                resetInterval();
            }
        }
    }
});

// Lightbox Functions (global scope)
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
