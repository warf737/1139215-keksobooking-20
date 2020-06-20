'use strict';

window.data = (function () {
  var map = document.querySelector('.map');

  var TITLES = [
    {
      title: 'Тихая квартирка недалеко от метро',
      description: 'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.'
    },
    {
      title: 'Стандартная квартира в центре',
      description: 'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
    },
    {
      title: 'Чёткая хата',
      description: 'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!'
    },
    {
      title: 'Наркоманский притон',
      description: 'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.'
    },
    {
      title: 'Милейший чердачок',
      description: 'Маленькая квартирка на чердаке. Для самых не требовательных.'
    },
    {
      title: 'Императорский дворец в центре Токио',
      description: 'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
    },
    {
      title: 'Милое гнездышко для фанатов аниме',
      description: 'Азиатов просьба не беспокоить.'
    },
    {
      title: 'Маленькая квартирка рядом с парком',
      description: 'Маленькая чистая квартира на краю парка. Без интернета, регистрации и СМС.'
    }
  ];
  var PHOTOS = [
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/5a29d708-9396-40bf-b002-92c5fdeb5c90.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/1c859bbf-61d6-4295-b463-c1d0cbf62592.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f5e66549-1940-4659-b27a-652f5c809231.jpeg',
    'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg',
    'https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130219545024.jpg',
    'https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130215449816.jpg',
    'https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130206399539.jpg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/69d53ff8-cd47-479d-8c9a-5170352aa169.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/19614107-a1da-4a0b-8a93-95107704a598.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/a97c72b9-e311-4a5a-863d-ea1e31ae9924.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d2a52c68-e877-4902-be6d-c7f3cb198437.jpeg'
  ];
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
  var AD_COUNT = 8;
  var PIN_SIZE = {
    x: 20,
    y: 20
  };
  var MAIN_PIN_SIZE = {
    x: 65,
    y: 65,
    arrow: 22

  };

  return {
    titles: TITLES,
    photos: PHOTOS,
    coordsX: COORDS_X,
    coordsY: COORDS_Y,
    roomsCount: ROOMS_COUNT,
    times: TIMES,
    features: FEATURES,
    adCount: AD_COUNT,
    pinSize: PIN_SIZE,
    roomTypes: ROOM_TYPES,
    mainPinSize: MAIN_PIN_SIZE
  };
})();
