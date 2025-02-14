//menu.JS

document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu() {
        var menu = document.getElementById("sideMenu");
        if (menu.style.left === "0px") {
            menu.style.left = "-300px"; // Hide menu
        } else {
            menu.style.left = "0px"; // Show menu
        }
    }

    // Attach event listeners to the buttons
    document.querySelector(".hamburger-menu").addEventListener("click", toggleMenu);
    document.querySelector(".close-btn").addEventListener("click", toggleMenu);
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".testimonials-container");
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");
    const testimonials = document.querySelectorAll(".testimonial");

    let index = 0;
    const gap = 20; // Adjust this based on your gap spacing
    const testimonialWidth = testimonials[0].offsetWidth + gap; // Width + gap
    const totalSlides = testimonials.length;

    function updateSlide() {
        container.style.transform = `translateX(-${index * testimonialWidth}px)`;
        
        // Hide Left Arrow if at Start
        prevButton.style.display = index === 0 ? "none" : "flex";

        // Hide Right Arrow if at End
        nextButton.style.display = index === totalSlides - 1 ? "none" : "flex";
    }

    nextButton.addEventListener("click", () => {
        if (index < totalSlides - 1) {
            index++;
            updateSlide();
        }
    });

    prevButton.addEventListener("click", () => {
        if (index > 0) {
            index--;
            updateSlide();
        }
    });

    // Initialize first state
    updateSlide();
});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".page-section");
    let isScrolling = false;

    window.addEventListener("wheel", (event) => {
        if (isScrolling) return;

        isScrolling = true;

        let direction = event.deltaY > 0 ? 1 : -1;
        let currentSection = Math.round(window.scrollY / window.innerHeight);
        let targetSection = currentSection + direction;

        if (targetSection >= 0 && targetSection < sections.length) {
            sections[targetSection].scrollIntoView({ behavior: "smooth" });
        }

        setTimeout(() => { isScrolling = false; }, 800);
    });
});

