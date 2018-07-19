import $ from 'jquery'
$(function() {
  $('.js-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
});