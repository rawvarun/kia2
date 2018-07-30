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
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  $('.carousel4').slick({
    centerMode: true,
    centerPadding: '8%',
    infinite: false,
    slidesToShow: 2,
    arrows: true,
    responsive: [{
        breakpoint: 767,
        settings: {
          centerMode: true,
          centerPadding: '0%',
          slidesToShow: 1
        }
      }
    ]
  });
  if($(window).outerWidth() < 768) {
    $('.js-carsTypes').slick({
      slidesToShow: 4,
      infinite: false,
      centerMode: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          centerMode: false,
          slidesToShow: 3,
          variableWidth: true
        }
      }
    ]
    });
  }
  
});