"use strict";

// hero splide
{
  new Splide(".splide", {
    arrows: false,
    autoplay: "pause",
    drag: false,
    heightRatio: 0.8,
    interval: 4500,
    intersection: {
      inView: {
        autoplay: true,
      },
      outView: {
        autoplay: false,
      },
    },
    pauseOnHover: true,
    pagination: false,
    speed: 1000,
    type: "fade",
    rewind: true,
  }).mount(window.splide.Extensions);

  new Splide(".p-top-product-slideshow", {
    arrows: false,
    autoScroll: {
      speed: 0.5,
      pauseOnHover: false,
    },
    drag: false,
    gap: "128px",
    intersection: {
      inView: {
        autoScroll: true,
      },
      outView: {
        autoScroll: false,
      },
    },
    pagination: true,
    type: "loop",
    rewind: true,
    breakpoints: {
      768: {
        drag: "free",
        gap: "64px",
      },
    },
  }).mount(window.splide.Extensions);
}


