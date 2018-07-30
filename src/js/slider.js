import $ from 'jquery'
$(function() {
  $('.js-carousel').slick({
    // autoplay: true,
    autoplaySpeed: 7000,
    dots: true,

    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    lazyLoad: 'ondemand',
    lazyLoadBuffer: 0
  });
  $(".single-item1").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //     infinite: true,
      //     dots: true
      //   }
      // },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});