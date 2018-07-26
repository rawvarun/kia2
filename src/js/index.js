import $ from 'jquery';
import 'bootstrap';
import '../css/import.scss';
import './vendor/slick.min.js';
import './vendor/multirange.js';
import './slider.js';

$(function () {
  $('[type=range]').on('change', function () {
    var input = document.querySelector('.original[type=range]'),
      selectedRange = '';
    if (input.valueLow && input.valueHigh) {
      selectedRange = '$' + (input.valueLow * 1000) + '-' + '$' + (input.valueHigh * 1000);
      $('.js-range-val').text(selectedRange);
    }
  });

  $('[data-toggle]').on('click', function () {
    $(this).closest('.list-item').toggleClass('expanded-list')
  });

  $('#toggle-nav').on('click', function () {
    if (this.checked == true) {
      $("header").addClass("expanded");
    } else {
      //console.log('a');
      $("header").removeClass("expanded");
    }
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("header").addClass("theme");
    } else {
      $("header").removeClass("theme");
    }
  });
})