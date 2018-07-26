import $ from 'jquery';
import 'bootstrap';
import '../css/import.scss';
import './vendor/slick.min.js';
import './vendor/multirange.js';
import './slider.js';
var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

var inventoryList = require('../templates/inventory-listing.hbs');
var inventoryData = require('../data/inventory-listing.json');

$(function() {

  function startSlider() {
    $('.js-list-model-carousel').slick({
      arrows: false
    });
    $('.slick-controllers li').on('click', function() {
      var slideno = $(this).data('slide');
      $(this).closest('.js-list-model-carousel').slick('slickGoTo', slideno);
    })
  }

  function destroySlider() {
    $('.js-list-model-carousel').slick('unslick');
  }

  function loadInventoryListing(listingObj) {
    $('.inventory-container').append(inventoryList(listingObj));
    startSlider();
  }

  function clearListing() {
    $('.align-items-center').remove();
  }

  function bindLoadMoreInventories() {
    $(window).scroll(function() {
      if ($('.align-items-center').length) {
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
          if ($('.loader').length == 0) {
            $('.inventory-container').append('<div class="loader"></div>');
            var timeout = setTimeout(function() {
              $('.loader').remove();
              destroySlider();
              loadInventoryListing(inventoryData);
              clearTimeout(timeout);
            }, 1000);
          }
        }
      }
    });
  }

  function bindSort() {
    $('.js-sort-by').siblings('.dropdown-menu').find('a').on('click', function() {
      var sortby = $(this).data('sortby');
      if ($('.align-items-center').length) {
        if (sortby == 'distance') {
          inventoryData["inventory-data"] = inventoryData["inventory-data"].sort(function(a, b) {
            var x = +a.distance < +b.distance ? -1 : 1;
            return x;
          });
        } else if (sortby == 'pricehigh') {
          inventoryData["inventory-data"] = inventoryData["inventory-data"].sort(function(a, b) {
            var x = a.modelprice < b.modelprice ? 1 : -1;
            return x;
          });
        } else if (sortby == 'pricelow') {
          inventoryData["inventory-data"] = inventoryData["inventory-data"].sort(function(a, b) {
            var x = a.modelprice < b.modelprice ? -1 : 1;
            return x;
          });
        } else {
          // nothing 
        }
        clearListing();
        destroySlider();
        loadInventoryListing(inventoryData);
      }
    });
  }



  loadInventoryListing(inventoryData);
  bindLoadMoreInventories();
  bindSort();

  $('[type=range]').on('change', function() {
    var input = document.querySelector('.original[type=range]'),
      selectedRange = '';
    if (input.valueLow == 0) {
      input.valueLow = 1;
    }
    if (input.valueLow && input.valueHigh) {
      selectedRange = '$' + (input.valueLow * 1000) + '-' + '$' + (input.valueHigh * 1000);
      $('.js-range-val').text(selectedRange);
      var filteredData = inventoryData["inventory-data"].filter(
        data => data.modelprice >= input.valueLow * 1000 && data.modelprice <= input.valueHigh * 1000
      );
      filteredData["inventory-data"] = filteredData;
      clearListing();
      destroySlider();
      loadInventoryListing(filteredData);


    }
  });

  $('[data-toggle]').on('click', function() {
    $(this).closest('.list-item').toggleClass('expanded-list')
  });

  $('#toggle-nav').on('click', function() {
    if (this.checked == true) {
      $("header").addClass("expanded");
    } else {
      //console.log('a');
      $("header").removeClass("expanded");
    }
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("header").addClass("theme");
    } else {
      $("header").removeClass("theme");
    }
  });
})