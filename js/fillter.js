'use strict';

window.filter = (function () {

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select');
  var featuresFieldset = filter.querySelector('#housing-features');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var selectFilters = filter.querySelectorAll('.map__filter');
  var inputFilters = filter.querySelectorAll('.map__filter-set input');
  var any = 'any';
  var low = 'low';
  var high = 'high';
  var middle = 'middle';
  var filteredData = [];
  var priceRange = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterAds = function () {
    filteredData = window.data.ads.slice(0);
    var data = [];
    console.log('filteredData: ', filteredData);
    for (var i = 0; i <= filteredData.length - 1; i++) {
      if (checkAd(filteredData[i])) {
        data.push(filteredData[i]);
      }
    }
    console.log('data', data);
    return data;
  };

  var checkAd = function (ad) {

    for (var i = 0; i < selectFilters.length; i++) {
      if (selectFilters[i] === typeSelect) {
        if (selectFilters[i].value !== any && ad.offer.type !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === priceSelect) {
        if (selectFilters[i].value !== any &&
          (selectFilters[i].value === low && ad.offer.price > priceRange.low.max
            || selectFilters[i].value === middle && (ad.offer.price < priceRange.middle.min || ad.offer.price > priceRange.middle.max)
            || selectFilters[i].value === high && ad.offer.price < priceRange.high.min)
        ) {
          return false;
        }
      }
      if (selectFilters[i] === roomsSelect) {
        if (selectFilters[i].value !== any && ad.offer.rooms.toString() !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === guestsSelect) {
        if (selectFilters[i].value !== any && ad.offer.guests.toString() !== selectFilters[i].value) {
          return false;
        }
      }
    }

    for (var j = 0; j < inputFilters.length; j++) {
      if (inputFilters[j].checked === true && ad.offer.features.indexOf(inputFilters[j].value) === -1) {
        return false;
      }
    }

    return true;
  };

  filter.addEventListener('change', function () {
    window.utils.debounce(window.map.updateMap, window.data.timeout);
  });

  var resetDropDowns = function () {
    filterItems.forEach(function (filterItem) {
      filterItem.value = any;
    });
  };

  var resetFeaturesFilter = function () {
    var featuresItems = featuresFieldset.querySelectorAll('input:checked');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var resetFilters = function () {
    resetDropDowns();
    resetFeaturesFilter();
  };

  return {
    onChangeFilter: filterAds,
    resetFilters: resetFilters,
  };
})();

