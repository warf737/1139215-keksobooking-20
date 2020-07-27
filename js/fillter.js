'use strict';

window.filter = (function () {

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select');
  var featuresFieldset = filter.querySelector('#housing-features');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var any = 'any';
  var filteredData = [];

  var activeFilters = {
    'housing-type': {
      value: any,
      active: false,
      type: 'type'
    },
    'housing-price': {
      value: any,
      active: false,
      type: 'price',
      priceRange: {
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
      }
    },
    'housing-rooms': {
      value: any,
      active: false,
      type: 'rooms'
    },
    'housing-guests': {
      value: any,
      active: false,
      type: 'guest'
    },
    'housing-features': {
      value: [],
      active: false,
      type: 'features'
    }
  };

  var filterAds = function () {
    filteredData = window.data.ads.slice(0);
    // ограничение на количество отрисовываемых пинов происходит в методе renderAllPins компонента map
    filteredData.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });
    return filteredData;
  };

  var changeFilters = function (evt) {
    var filterName = evt.target.name === activeFilters[featuresFieldset.id].type ? featuresFieldset.id : evt.target.name;

    // устанавливает фильтры для выпадающих меню
    if (filterName !== featuresFieldset.id) {
      activeFilters[filterName].active = evt.target.value !== any;
      activeFilters[filterName].value = evt.target.value;
    } else {

      // работает с фильтрами для feature
      var isExist = activeFilters[filterName].value.find(function (item) {
        return item === evt.target.value;
      });

      // убирает feature из массива, если она уже была выбрана
      if (isExist) {
        var indexExistingElement = activeFilters[filterName].value.indexOf(isExist);
        activeFilters[filterName].value.splice(indexExistingElement, 1);
      } else {
        // добавляет feature в массив, если еще не добавлена
        activeFilters[filterName].value.push(evt.target.value);
      }
      activeFilters[filterName].active = activeFilters[filterName].value.length !== 0;
    }
  };

  filter.addEventListener('change', function (evt) {
    changeFilters(evt);
    window.utils.debounce(window.map.updateMap, window.data.timeout);
  });

  var getRank = function (ad) {
    var rank = 0;

    if (checkActivity(activeFilters[typeSelect.name].value) &&
      ad.offer.type === activeFilters[typeSelect.name].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters[roomsSelect.name].value) &&
      ad.offer.rooms === activeFilters[roomsSelect.name].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters[guestsSelect.name].value) &&
      ad.offer.guests === activeFilters[guestsSelect.name].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters[priceSelect.name].value) &&
      ad.offer.price >= activeFilters[priceSelect.name].priceRange[activeFilters[priceSelect.name].value].min &&
      ad.offer.price <= activeFilters[priceSelect.name].priceRange[activeFilters[priceSelect.name].value].max) {
      rank += 1;
    }

    if (activeFilters[featuresFieldset.id].value.length > 0 &&
      ad.offer.features.length > 0
      && checkIncludes(activeFilters[featuresFieldset.id].value, ad.offer.features)) {
      rank += 1;
    }
    return rank;
  };

  var checkActivity = function (value) {
    return value !== any;
  };
  var checkIncludes = function (adFeatures, filterFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (adFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

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
