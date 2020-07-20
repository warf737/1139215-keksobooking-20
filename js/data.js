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
  var ROOM_TYPES = [
    {
      type: 'Дворец',
      value: 'palace',
      minPrice: 10000
    },
    {
      type: 'Квартира',
      value: 'flat',
      minPrice: 1000
    },
    {
      type: 'Дом',
      value: 'house',
      minPrice: 5000
    },
    {
      type: 'Бунгало',
      value: 'bungalo',
      minPrice: 0
    }
  ];
  var ROOMS_COUNT = [
    1,
    2,
    3,
    100
  ];
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
  var ads = [];
  return {
    coordsX: COORDS_X,
    coordsY: COORDS_Y,
    roomsCount: ROOMS_COUNT,
    times: TIMES,
    features: FEATURES,
    adCount: AD_COUNT,
    pinSize: PIN_SIZE,
    roomTypes: ROOM_TYPES,
    mainPinSize: MAIN_PIN_SIZE,
    ads: ads,
    fileTypes: FILE_TYPES
  };
})();
