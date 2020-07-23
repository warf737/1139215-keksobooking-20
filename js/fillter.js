'use strict';

window.filter = (function () {

  var filtersContainer = document.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var oldFilteredAds = [];
  var newFilteredAds = [];
  var filterList = window.data.filters;
  var priceRange = window.data.priceRange;
  var any = 'any';

  var filterByType = function (ads, filterValue) {
    return ads.filter(function (ad) {
      return ad.offer.type === filterValue;
    });
  };

  var filterByRooms = function (ads, filterValue) {
    return ads.filter(function (ad) {
      return ad.offer.rooms.toString() === filterValue;
    });
  };

  var filterByGuests = function (ads, filterValue) {
    return ads.filter(function (ad) {
      return ad.offer.guests.toString() === filterValue;
    });
  };

  var filterByPrice = function (ads, filterValue) {
    var filteringPrice = priceRange[filterValue.toUpperCase()];
    return ads.filter(function (ad) {
      return filteringPrice ? ad.offer.price >= filteringPrice.MIN && ad.offer.price <= filteringPrice.MAX : true;
    });
  };

  var filterByFeatures = function (ads, featureValue) {
    return ads.filter(function (ad) {
      return ad.offer.features.indexOf(featureValue) >= 0;
    });
  };

  filtersContainer.addEventListener('change', function () {
    window.utils.debounce(window.map.updateMap, window.data.timeout);
  });

  var filterAds = function (ads) {
    oldFilteredAds = ads.slice();
    newFilteredAds = ads.slice();

    // Формирует массив из фильтров, которые были применены (фильтр был применен,
    // если его значение отличается от значения 'any')
    var appliedFilters = Array.from(filters).filter(function (filter) {
      return filter.value !== any;
    });

    // Формирует массив из выбранных характеристик объявления
    var checkedFeatures = Array.from(filtersContainer.querySelectorAll('.map__filter-set input[name="features"]:checked'));

    // Фильтрует объявления по каждому примененному фильтру
    appliedFilters.forEach(function (filter) {
      var filterName = filter.name;
      if (filterName === filterList.filterByType) {
        oldFilteredAds = filterByType(oldFilteredAds, filter.value);
      } else if (filterName === filterList.filterByRooms) {
        oldFilteredAds = filterByRooms(oldFilteredAds, filter.value);
      } else if (filterName === filterList.filterByGuests) {
        oldFilteredAds = filterByGuests(oldFilteredAds, filter.value);
      } else if (filterName === filterList.filterByPrice) {
        oldFilteredAds = filterByPrice(oldFilteredAds, filter.value);
      }
    });

    // Фильтрует объявления по каждой выбранной характеристике
    checkedFeatures.forEach(function (feature) {
      oldFilteredAds = filterByFeatures(oldFilteredAds, feature.value);
    });


    console.log('ads: ', ads,
      'old filtered ads: ', oldFilteredAds,
      'new filtered ads: ', newFilteredAds);
    return oldFilteredAds;
  };

  return {
    filterAds: filterAds
  };
})();
