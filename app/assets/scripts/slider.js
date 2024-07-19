const commentSlider = new Swiper(".comment.swiper", {
  direction: "horizontal",
  loop: true,

  spaceBetween: 10,

  pagination: {
    el: ".comment .swiper-pagination",
  },
});

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
