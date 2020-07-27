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
    var adOffer = ad.offer;
    var adFeatures = ad.offer.features;
    var adPrice = adOffer.price;

    for (var i = 0; i < selectFilters.length; i++) {
      if (selectFilters[i] === typeSelect) {
        // console.log('фильтр типов: ', selectFilters[i]);
        // console.log('тип в объявлении: ', ad.offer.type);
        if (selectFilters[i].value !== any && ad.offer.type !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === priceSelect) {
        if (selectFilters[i].value !== any &&
          (selectFilters[i].value === low && adPrice >= window.utils.PRICE_LOW
            || selectFilters[i].value === middle && (adPrice <= window.utils.PRICE_LOW || adPrice >= window.utils.PRICE_MIDDLE)
            || selectFilters[i].value === high && adPrice <= window.utils.PRICE_MIDDLE)
        ) {
          return false;
        }
      }
      if (selectFilters[i] === roomsSelect) {
        console.log('фильтр комнат: ', +selectFilters[i].value);
        console.log('комнат в объявлении: ', ad.offer.rooms);
        if (selectFilters[i].value !== any && ad.offer.rooms !== +selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === guestsSelect) {
        if (selectFilters[i].value !== any && ad.offer.guests !== selectFilters[i].value) {
          return false;
        }
      }
    }

    // for (var j = 0; j < inputFilters.length; j++) {
    //   if (inputFilters[j].checked === true && adFeatures.indexOf(inputFilters[j].value) === -1) {
    //     return false;
    //   }
    // }

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

