import $ from 'jquery';
import 'bootstrap';
import '../css/import.scss';
import './vendor/slick.min.js';
import './vendor/multirange.js';
import './slider.js';
import { debug } from 'util';
var Handlebars = require('handlebars/runtime');
var inventoryList = require('../templates/inventory-listing.hbs');
var inventoryData = require('../data/inventory-listing.json');

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


$(function() {

  function isElementInViewport(el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    try {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      );
    } catch (e) {
      console.log('element reference is not correct');
      return false;
    }
  }

  function startSlider() {
    $('.js-list-model-carousel').slick({
      arrows: false
    });
    $('.js-list-model-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide) {
      $(".slick-controllers").find('div').removeClass('active-controller');
      $(this).find('[data-slide="' + currentSlide + '"]').find('div').addClass('active-controller');
    });
    $('.slick-controllers li').on('click', function() {
      var slideno = $(this).data('slide');
      $(this).closest('.js-list-model-carousel').slick('slickGoTo', slideno);
    });
  }

  function destroySlider() {
    $('.js-list-model-carousel').slick('unslick');
  }

  function loadInventoryListing(listingObj) {
    $('.error-msg').remove();
    $('.inventory-container').append(inventoryList(listingObj));
    startSlider();
  }

  function clearListing() {
    $('.align-items-center').remove();
  }

  function bindLoadMoreInventories() {
    $(window).scroll(function() {
      if ($('.align-items-center').length) {
        if ($(document).height() <= $(window).scrollTop() + $(window).height() + ($('footer').height() / 2)) {
          var objPriceRange = getPriceRange();
          if (objPriceRange.lowerVal > 1000 || objPriceRange.higherVal < 100000) {
            return;
          } else {
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


  function getPriceRange() {
    var input = document.querySelector('.original[type=range]'),
      selectedRange = '';
    if (input.valueLow == 0) {
      input.valueLow = 1;
    }
    return {
      "lowerVal": input.valueLow * 1000,
      "higherVal": input.valueHigh * 1000
    }
  }


  function bindRangeSliderEvents() {
    $('[type=range]').on('change', function() {
      var selectedRange,
        obj = getPriceRange();
      if (obj.lowerVal && obj.higherVal) {
        selectedRange = '$' + obj.lowerVal + '-' + '$' + obj.higherVal;
        $('.js-range-val').text(selectedRange);
        var filteredData = inventoryData["inventory-data"].filter(
          data => data.modelprice >= obj.lowerVal && data.modelprice <= obj.higherVal
        );
        filteredData["inventory-data"] = filteredData;
        clearListing();
        destroySlider();
        loadInventoryListing(filteredData);
      }
    });
  }

  function animateFeatureDrawer() {
    if (isElementInViewport($('.feature-drawer')[0])) {
      $('.feature-drawer').find('.bounceInRightAnim').each(function(i) {
        $(this).addClass('animated bounceInRight delay-' + i);
      });
    }
  }

  function animateFamilyLineup() {
    if (isElementInViewport($('#carouselExampleIndicators1')[0])) {
      $('#carouselExampleIndicators1').find('.carousel-item:first').addClass('animated bounceInRight delay-0');
    }
  }


  $('[data-toggle]').on('click', function() {
    $(this).closest('.list-item').toggleClass('expanded-list')
  });

  $('.card-body-close').on('click', function() {
    $('.collapse').removeClass('show');
    $('.collapse').closest('slideInUp').removeClass('expanded-list');
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
    animateFeatureDrawer();
    animateFamilyLineup();
  });

  loadInventoryListing(inventoryData);
  bindLoadMoreInventories();
  bindSort();
  bindRangeSliderEvents();
  animateFeatureDrawer();
  animateFamilyLineup();
});