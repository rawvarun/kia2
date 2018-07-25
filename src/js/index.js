import $ from 'jquery';
import 'bootstrap';
import '../css/import.scss';
import './vendor/slick.min.js';
import './vendor/multirange.js';
import './slider.js';

$(function() {
  $('[type=range]').on('change', function() {
    var input = document.querySelector('.original[type=range]'),
      selectedRange = '';
    if (input.valueLow && input.valueHigh) {
      selectedRange = '$' + (input.valueLow * 1000) + '-' + '$' + (input.valueHigh * 1000);
      $('.js-range-val').text(selectedRange);
    }
  })
})