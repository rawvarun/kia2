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
});