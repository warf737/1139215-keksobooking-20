'use strict';

/* <=== CONSTANTS & VARIABLES===> */

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form--disabled');
var addressInput = form.querySelector('#address');
var fieldsets = form.querySelectorAll('fieldset');
var fragment = document.createDocumentFragment();
var lastActiveElement;
var popup;
var popupClose;

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
  MIN: 0,
  MAX: map.offsetWidth
};

var COORDS_Y = {
  MIN: 130,
  MAX: 630
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
  var path = 'img/avatars/user0';
  var format = '.png';
  return path + number + format;
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
var createAd = function (number) {
  var x = getRandomNumber(COORDS_X.MIN, COORDS_X.MAX);
  var y = getRandomNumber(COORDS_Y.MIN, COORDS_Y.MAX);

  var checkin = getRandomArrElement(TIMES);
  var checkout = getRandomArrElement(TIMES);
  var descriptions = getRandomArrElement(TITLES);
  var roomsNumber = getRandomArrElement(ROOMS_COUNT);
  var guestsNumber = getNumberRooms(roomsNumber);
  var features = generateRandomArray(FEATURES);
  var roomType = getRandomArrElement(ROOM_TYPES);
  var photos = generateRandomArray(PHOTOS);

  return {
    author: {
      avatar: getUserAvatar(number + 1)
    },
    offer: {
      title: descriptions.title,
      address: x + ', ' + y,
      price: roomType.minPrice,
      type: roomType.type,
      rooms: roomsNumber,
      guests: guestsNumber,
      checkin: 'после ' + checkin,
      checkout: 'до ' + checkout,
      features: features,
      description: descriptions.description,
      photos: photos,
    },
    location: {
      x: x,
      y: y
    }
  };
};
var renderPin = function (ad, number) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.style.left = ad.location.x - PIN_SIZE.x / 2 + 'px';
  pinElement.style.top = ad.location.y + PIN_SIZE.y + 'px';
  pinElement.number = number;
  return pinElement;
};
var articleRooms = function (numberRooms) {
  var article = ' комната ';
  if (numberRooms > 1 && numberRooms < 100) {
    article = ' комнаты ';
  }
  if (numberRooms === 100) {
    article = ' комнат ';
  }
  return article;
};
var renderCard = function (ad) {
  var mapElement = cardTemplate.cloneNode(true);
  var featureList = mapElement.querySelector('.popup__features');
  var photos = mapElement.querySelector('.popup__photos');
  var articleRoom = articleRooms(ad.offer.rooms);
  mapElement.querySelector('.popup__title').textContent = ad.offer.title;
  mapElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  mapElement.querySelector('.popup__type').textContent = ad.offer.type;
  mapElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + articleRoom + ad.offer.guests;
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд ' + ad.offer.checkin + ', выезд ' + ad.offer.checkout;
  mapElement.querySelector('.popup__description').textContent = ad.offer.description;
  mapElement.querySelector('.popup__avatar').src = ad.author.avatar;

  featureList.innerHTML = '';
  for (var i = 0; i < ad.offer.features.length; i++) {
    var featureElement = '<li class="feature feature--' + ad.offer.features[i] + '"></li>';
    featureList.insertAdjacentHTML('afterbegin', featureElement);
  }

  photos.innerHTML = '';
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var photo = '<img src= "' + ad.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    photos.insertAdjacentHTML('afterbegin', photo);
  }
  return mapElement;
};
var createAds = function () {
  var adArray = [];
  for (var i = 0; i < AD_COUNT; i++) {
    var ad = createAd(i);
    adArray.push(ad);
  }
  return adArray;
};
// делает страницу активной
var activatePage = function () {
  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderPin(ads[j], j));
  }
  // добавляет созданные пины в DOM
  mapPins.appendChild(fragment);
  map.classList.remove('.map--faded');
  form.classList.remove('.ad-form--disabled');

  // делает все поля формы доступными
  changeAccessibility(fieldsets);
  /* назначает обработчик showPopups на элемент 'Карта',
     в котором расположены элементы 'Метка объявления на карте'*/
  mapPins.addEventListener('click', showPopUps);

  // удаляет обработчики с элемента 'Главный пин'
  mapPinMain.removeEventListener('mouseup', activatePage);
  mapPinMain.removeEventListener('keydown', onMainPinPressEnter);
};
// изменяет доступность для редактирования
var changeAccessibility = function (array) {
  array.forEach(function (elem) {
    elem.disabled = (elem.disabled) ? false : true;
  });
};

var changeAddressOnForm = function (coordLeft, coordTop) {
  var x = regExpCoord(coordLeft);
  var y = regExpCoord(coordTop);
  addressInput.value = generateAddress(x, y);
};
var regExpCoord = function (coordinate) {
  return coordinate.replace(/[^+\d]/g, '');
};
var generateAddress = function (x, y) {
  return 'top:' + y + ', ' + 'left:' + x;
};
// активирует страницу при нажатии клавиши Enter если есть фокус на главном пине
var onMainPinPressEnter = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
};

var showPopUps = function (evt) {
  var target = evt.target.closest('.map__pin');

  if (target && target !== mapPinMain) {
    if (lastActiveElement) {
      lastActiveElement.classList.remove('.map__pin--active');
      popup.remove();
    }
    target.classList.add('.map__pin--active');
    lastActiveElement = target;
    popup = renderCard(ads[lastActiveElement.number]);
    map.appendChild(popup);
    changeAddressOnForm(lastActiveElement.style.left, lastActiveElement.style.top);
    popupClose = map.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);

  }
  if (popup && target === mapPinMain) {
    closePopup();
  }
};

var closePopup = function () {
  lastActiveElement.classList.remove('.map__pin--active');
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};
/* <=== /FUNCTIONS ===> */


/* <=== FUNCTION CALLS ===> */
addressInput.value = generateAddress(mapPinMain.style.left, mapPinMain.style.top);

// создает все объявления
var ads = createAds();
// Формирует из DOM-коллекции массив
fieldsets = Array.prototype.slice.call(fieldsets);

// Делает все поля формы недоступными в момент открытия страницы
changeAccessibility(fieldsets);

// Добавляет обработчики на элемент 'Главный пин'
mapPinMain.addEventListener('mouseup', activatePage);
mapPinMain.addEventListener('keydown', onMainPinPressEnter);

/* Валидация форм*/
var checkinSelect = form.querySelector('#timein');
var checkoutSelect = form.querySelector('#timeout');
var typeSelect = form.querySelector('#type');
var priceInput = form.querySelector('#price');
var roomsSelect = form.querySelector('#room_number');
var guestsSelect = form.querySelector('#capacity');

checkinSelect.addEventListener('change', function () {
  checkoutSelect.options[checkinSelect.selectedIndex].selected = true;
});
checkoutSelect.addEventListener('change', function () {
  checkinSelect.options[checkoutSelect.selectedIndex].selected = true;
});

typeSelect.addEventListener('change', function () {
  for (var i = 0; i < ROOM_TYPES.length; i++) {
    if (ROOM_TYPES[i].value === typeSelect.value) {
      priceInput.min = ROOM_TYPES[i].minPrice;
      break;
    }
  }
});

roomsSelect.addEventListener('change', function () {
  var guestCount = (roomsSelect.value === '100') ? '0' : roomsSelect.value;

  for (var i = 0; i < guestsSelect.options.length; i++) {
    guestsSelect.options[i].disabled = (guestCount === '0') ?
      (guestsSelect.options[i].value !== '0') :
      (guestsSelect.options[i].value > guestCount || guestsSelect.options[i].value === '0');
  }
});
/* конец валидации форм */

/* <=== /FUNCTION CALLS ===> */
