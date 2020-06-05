'use strict';

/* <=== CONSTANTS & VARIABLES===> */
var TITLES = [
  'Тихая квартирка недалеко от метро',
  'Стандартная квартира в центре',
  'Чёткая хата',
  'Наркоманский притон',
  'Милейший чердачок',
  'Императорский дворец в центре Токио',
  'Милое гнездышко для фанатов аниме',
  'Маленькая квартирка рядом с парком'
];

var COORDS_X = {
  MIN: 50,
  MAX: 1100
};

var COORDS_Y = {
  MIN: 65,
  MAX: 650
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

var GUESTS_COUNT = {
  MIN: 1,
  MAX: 12
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

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

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
var getUserAvatar = function () {
  var path = 'img/avatars/user';
  var format = '.png';
  var number = getRandomNumber(1, 8);
  return path + (number < 9 ? '0' : '') + number + format;
};

// преобразует входной массив в массив случайной длины и случайными элементами
var generateRandomArray = function (arr) {
  var randomArr = [];
  var randomArrLength = getRandomNumber(1, arr.length);
  var copiedArray = arr.slice();

  for (var i = 0; i < randomArrLength; i++) {
    var randomArrElement = getRandomArrElement(copiedArray);
    copiedArray = copiedArray.filter(function (item) {
      return item !== randomArrElement;
    });
    randomArr.push(randomArrElement);
  }
  return randomArr;
};

// создает одно объявление
var createAd = function () {
  var x = getRandomNumber(COORDS_X.MIN, COORDS_X.MAX);
  var y = getRandomNumber(COORDS_Y.MIN, COORDS_Y.MAX);

  return {
    author: {
      avatar: getUserAvatar()
    },
    offer: {
      title: getRandomArrElement(TITLES),
      address: +x + ', ' + y,
      price: getRandomNumber(PRICE.MIN, PRICE.MAX),
      type: getRandomArrElement(TYPES),
      rooms: getRandomNumber(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomNumber(GUESTS_COUNT.MIN, GUESTS_COUNT.MAX),
      checkin: getRandomArrElement(TIMES),
      checkout: getRandomArrElement(TIMES),
      features: generateRandomArray(FEATURES),
      description: '',
      photos: [],
    },
    location: {
      x: x,
      y: y
    }
  };
};

// создает массив объявлений
var createAds = function () {
  var adArray = [];
  for (var i = 0; i < AD_COUNT; i++) {
    var ad = createAd();
    adArray.push(ad);
  }
  return adArray;
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
var ads = createAds();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

mapPins.appendChild(fragment);

map.classList.remove('map--faded');
/* <=== /FUNCTION CALLS ===> */
