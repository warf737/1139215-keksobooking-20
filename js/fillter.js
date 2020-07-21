'use strict';

window.filter = (function () {

  var filtersContainer = document.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var roomTypes = window.data.roomTypes;
  var filteredAds = [];
  var filterList = window.data.filters;
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
    return ads.filter(function (ad) {
      var priceInterval = {
        'low': ad.offer.price < roomTypes.flat.minPrice,
        'middle': ad.offer.price >= roomTypes.flat.minPrice && ad.offer.price < roomTypes.house.minPrice,
        'high': ad.offer.price > roomTypes.house.minPrice
      };
      return priceInterval[filterValue];
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
    filteredAds = ads.slice();

    // Формирует массив из фильтров, которые были применены (фильтр был применен,
    // если его значение отличается от значения 'any') todo
    var appliedFilters = Array.from(filters).filter(function (filter) {
      return filter.value !== 'any';
    });

    // Формирует массив из выбранных характеристик объявления
    var checkedFeatures = Array.from(filtersContainer.querySelectorAll('.map__filter-set input[name="features"]:checked'));

    // Фильтрует объявления по каждому примененному фильтру
    appliedFilters.forEach(function (filter) {
      var filterName = filter.name;
      if (filterName === filterList.filterByType) {
        filteredAds = filterByType(filteredAds, filter.value);
      } else if (filterName === filterList.filterByRooms) {
        filteredAds = filterByRooms(filteredAds, filter.value);
      } else if (filterName === filterList.filterByGuests) {
        filteredAds = filterByGuests(filteredAds, filter.value);
      } else if (filterName === filterList.filterByPrice) {
        filteredAds = filterByPrice(filteredAds, filter.value);
      }
    });

    // Фильтрует объявления по каждой выбранной характеристике
    checkedFeatures.forEach(function (feature) {
      filteredAds = filterByFeatures(filteredAds, feature.value);
    });

    return filteredAds;
  };

  return {
    filterAds: filterAds
  };
})();
