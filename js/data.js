'use strict';

window.data = (function () {
  var map = document.querySelector('.map');

  var COORDS_X = {
    min: 0,
    max: map.offsetWidth
  };
  var COORDS_Y = {
    min: 130,
    max: 630
  };
  var ROOM_TYPES = {
    palace: {
      type: 'Дворец',
      value: 'palace',
      minPrice: 10000
    },
    flat: {
      type: 'Квартира',
      value: 'flat',
      minPrice: 1000
    },
    house: {
      type: 'Дом',
      value: 'house',
      minPrice: 5000
    },
    bungalo: {
      type: 'Бунгало',
      value: 'bungalo',
      minPrice: 0
    }
  };
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var AD_COUNT = 5;
  var PIN_SIZE = {
    x: 20,
    y: 20
  };
  var MAIN_PIN_SIZE = {
    x: 65,
    y: 65,
    arrow: 22
  };
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];
  var DEBOUNCE_INTERVAL = 500;
  var EXCEPTION_NUMBERS = {
    roomsNumber: '100', guestNumber: '0'
  };
  var ads = [];
  var KEY_CODES = {
    esc: {
      code: 27,
      name: 'Escape'
    },
    enter: {
      code: 13,
      name: 'Enter'
    }
  };
  var FILTERS = {
    filterByType: 'housing-type',
    filterByRooms: 'housing-rooms',
    filterByGuests: 'housing-guests',
    filterByPrice: 'housing-price'
  };

  return {
    coordsX: COORDS_X,
    coordsY: COORDS_Y,
    times: TIMES,
    features: FEATURES,
    adCount: AD_COUNT,
    pinSize: PIN_SIZE,
    roomTypes: ROOM_TYPES,
    mainPinSize: MAIN_PIN_SIZE,
    ads: ads,
    fileTypes: FILE_TYPES,
    timeout: DEBOUNCE_INTERVAL,
    exceptionNumbers: EXCEPTION_NUMBERS,
    keys: KEY_CODES,
    filters: FILTERS
  };
})();
