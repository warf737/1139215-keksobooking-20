'use strict';

/* <=== CONSTANTS & VARIABLES===> */

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

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

var COORDS_X = {
  MIN: 0,
  MAX: map.offsetWidth
};

var COORDS_Y = {
  MIN: 130,
  MAX: 630
};

var PRICE = {
  MIN: 100,
  MAX: 2000
};

var TYPES = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

var ROOMS = {
  MIN: 1,
  MAX: 5
};

var ROOMS = [
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

// var PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];

var AD_COUNT = 8;

var PIN_SIZE = {
  x: 20,
  y: 20
};

/* <=== /CONSTANTS & VARIABLES ===> */


/* <=== FUNCTIONS ===> */

// генерирует случайное число в заданном диапазоне
var getRandomNumber = function (min, max) {
  var int = min + Math.random() * (max + 1 - min);
  return Math.floor(int);
};

// получает случайный элемента массива
var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

// формирует строку вида img/avatars/user08.png
var getUserAvatar = function (number) {
  var path = 'img/avatars/user';
  var format = '.png';
  return path + (number < 9 ? '0' : '') + number + format;
};

// перемешивает значения массива в случайном порядке
var shuffleArr = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
};

// преобразует входной массив в массив случайной длины и случайными элементами
var generateRandomArray = function (arr) {
  var copiedArr = arr;
  var randomArrLength = getRandomNumber(0, copiedArr.length);
  copiedArr = shuffleArr(copiedArr);
  var features = shuffleArr(copiedArr).slice(0, randomArrLength);
  return features;
};

// получаем количество гостей в зависимости от количества комнат
var getNumberRooms = function (rooms) {
  var numberOfRoom = 'не для гостей';

  if (rooms !== 100) {
    var guestCount = getRandomNumber(1, rooms);
    numberOfRoom = guestCount > 1 ?
      'для ' + guestCount + ' гостей' :
      'для ' + guestCount + ' гостя';
  }
  return numberOfRoom;
};

// создает одно объявление
var createAd = function (i) {
  var x = getRandomNumber(COORDS_X.MIN, COORDS_X.MAX);
  var y = getRandomNumber(COORDS_Y.MIN, COORDS_Y.MAX);

  var time = getRandomArrElement(TIMES);
  var descriptions = getRandomArrElement(TITLES);
  var rooms = getRandomArrElement(ROOMS);
  var guests = getNumberRooms(rooms);
  var features = generateRandomArray(FEATURES);

  return {
    author: {
      avatar: getUserAvatar(i + 1)
    },
    offer: {
      title: descriptions.title,
      address: +x + ', ' + y,
      price: getRandomNumber(PRICE.MIN, PRICE.MAX),
      type: getRandomArrElement(TYPES),
      rooms: rooms,
      guests: guests,
      checkin: 'после ' + time,
      checkout: 'до ' + time,
      features: features,
      description: descriptions.description,
      photos: [],
    },
    location: {
      x: x,
      y: y
    }
  };
};

var renderPin = function (ad) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.style.left = ad.location.x - PIN_SIZE.x / 2 + 'px';
  pinElement.style.top = ad.location.y + PIN_SIZE.y + 'px';

  return pinElement;
};
/* <=== /FUNCTIONS ===> */


/* <=== FUNCTION CALLS ===> */

// рендерим все пины
for (var i = 0; i < AD_COUNT; i++) {
  var ad = createAd(i);
  console.log(ad);
  fragment.appendChild(renderPin(ad));
  mapPins.appendChild(fragment);
}

map.classList.remove('map--faded');
/* <=== /FUNCTION CALLS ===> */
