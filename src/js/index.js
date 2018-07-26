import $ from 'jquery';
import 'bootstrap';
import '../css/import.scss';
import './vendor/slick.min.js';
import './vendor/multirange.js';
import './slider.js';

var inventoryList = require('../templates/inventory-listing.hbs');
var inventoryData = require('../data/inventory-listing.json');
$(function() {
  $('.inventory-container').append(inventoryList(inventoryData));
  $('[type=range]').on('change', function() {
    var input = document.querySelector('.original[type=range]'),
      selectedRange = '';
    if (input.valueLow && input.valueHigh) {
      selectedRange = '$' + (input.valueLow * 1000) + '-' + '$' + (input.valueHigh * 1000);
      $('.js-range-val').text(selectedRange);
    }
  });

  $('[data-toggle]').on('click', function() {
    $(this).closest('.list-item').toggleClass('expanded-list')
  })

  $('.js-list-model-carousel').slick({
    arrows: false,
    dots: true
  });

})