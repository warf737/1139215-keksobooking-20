'use strict';

window.data = (function () {
  var map = document.querySelector('.map');
  var COORDS_X;
  var COORDS_Y;
  var TIMES;
  var FEATURES;
  var AD_COUNT;
  var PIN_SIZE;
  var MAIN_PIN_SIZE;
  var FILE_TYPES;
  var DEBOUNCE_INTERVAL;
  var EXCEPTION_NUMBERS;
  var KEY_CODES;
  var ads = [];
  var FILTERS;
  var PRICE_RANGE;

  COORDS_X = {
    min: 0,
    max: map.offsetWidth
  };
  COORDS_Y = {
    min: 130,
    max: 630
  };
  TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  AD_COUNT = 5;
  PIN_SIZE = {
    x: 20,
    y: 20
  };
  MAIN_PIN_SIZE = {
    x: 65,
    y: 65,
    arrow: 22
  };
  FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];
  DEBOUNCE_INTERVAL = 500;
  EXCEPTION_NUMBERS = {
    roomsNumber: '100',
    guestNumber: '0'
  };
  KEY_CODES = {
    esc: {
      code: 27,
      name: 'Escape'
    },
    enter: {
      code: 13,
      name: 'Enter'
    }
  };
  FILTERS = {
    filterByType: 'housing-type',
    filterByRooms: 'housing-rooms',
    filterByGuests: 'housing-guests',
    filterByPrice: 'housing-price'
  };
  PRICE_RANGE = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  return {
    coordsX: COORDS_X,
    coordsY: COORDS_Y,
    times: TIMES,
    features: FEATURES,
    adCount: AD_COUNT,
    pinSize: PIN_SIZE,
    mainPinSize: MAIN_PIN_SIZE,
    ads: ads,
    fileTypes: FILE_TYPES,
    timeout: DEBOUNCE_INTERVAL,
    exceptionNumbers: EXCEPTION_NUMBERS,
    keys: KEY_CODES,
    filters: FILTERS,
    priceRange: PRICE_RANGE
  };
})();
