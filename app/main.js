// Import SCSS - Vite will compile it to CSS
import './assets/styles/main.scss'
// Import icons CSS
import './assets/css/icons.css'

// Import Swiper
import { Swiper } from 'swiper'

// FOUC Prevention - Hide content until styles are loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for CSS to load before showing content
  setTimeout(() => {
    document.body.classList.add('styles-loaded');
  }, 100);
  
  // Load JavaScript files
  loadScripts();
});

// Function to load scripts safely
async function loadScripts() {
  const scripts = [
    "./assets/scripts/script.js",
    "./assets/scripts/index.js",
    "./assets/scripts/slider.js",
    "./assets/scripts/scrollTop.js",
    "./assets/scripts/expander.js",
    "./assets/scripts/faq.js",
    "./assets/scripts/input.js",
    "./assets/scripts/trun.js",
    "./assets/scripts/validation.js",
    "./assets/scripts/operationunitsSlider.js",
    "./assets/scripts/form-submission.js",
  ];

  for (const script of scripts) {
    try {
      await import(/* @vite-ignore */ script);
    } catch (error) {}
  }
}
