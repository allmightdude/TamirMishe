// Import Swiper
import { Swiper } from 'swiper';

// Initialize representation slider
function initializeRepresentationSlider() {
  console.log("✅ Initializing representation slider...");
  
  // Initialize representation slider
  const swiper = new Swiper(".representation", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 4,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
    },
    autoplay: {
      delay: 1000,
    },
    pagination: {
      el: ".representation .swiper-pagination",
    },
  });
  
  console.log("✅ Representation slider initialized successfully");
}

// Initialize slider when DOM is ready
document.addEventListener("DOMContentLoaded", initializeRepresentationSlider);
