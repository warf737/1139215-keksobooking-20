'use strict';

window.filter = (function () {

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select');
  var featuresFieldset = filter.querySelector('#housing-features');
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
    var filterName = evt.target.name === activeFilters['housing-features'].type ? 'housing-features' : evt.target.name;

    // устанавливает фильтры для выпадающих меню
    if (filterName !== 'housing-features') {
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

    if (checkActivity(activeFilters['housing-type'].value) &&
      ad.offer.type === activeFilters['housing-type'].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters['housing-rooms'].value) &&
      ad.offer.rooms === activeFilters['housing-rooms'].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters['housing-guests'].value) &&
      ad.offer.guests === activeFilters['housing-guests'].value) {
      rank += 1;
    }

    if (checkActivity(activeFilters['housing-price'].value) &&
      ad.offer.price >= activeFilters['housing-price'].priceRange[activeFilters['housing-price'].value].min &&
      ad.offer.price <= activeFilters['housing-price'].priceRange[activeFilters['housing-price'].value].max) {
      rank += 1;
    }

    if (activeFilters['housing-features'].value.length > 0 &&
      ad.offer.features.length > 0
      && checkIncludes(activeFilters['housing-features'].value, ad.offer.features)) {
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
