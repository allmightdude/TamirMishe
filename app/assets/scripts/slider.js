// Import Swiper
import { Swiper } from 'swiper';

// Initialize sliders
function initializeSliders() {
  console.log("✅ Initializing sliders...");
  
  // Initialize comment slider
  const commentSlider = new Swiper(".comment.swiper", {
    direction: "horizontal",
    loop: true,
    spaceBetween: 10,
    slidesPerView: 2,
    pagination: {
      el: ".comment .swiper-pagination",
    },
  });

  // Initialize review aside slider
  const reviewAsideSlider = new Swiper(".reviewPannel.swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 100,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".reviewPannel .swiper-pagination",
    },
  });
  
  console.log("✅ Sliders initialized successfully");
}

// Initialize sliders when DOM is ready
document.addEventListener("DOMContentLoaded", initializeSliders);
