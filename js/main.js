'use strict';

/*
{
  "author": {
  "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
},
  "offer": {
  "title": строка, заголовок предложения
  "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
  "price": число, стоимость
  "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  "rooms": число, количество комнат
  "guests": число, количество гостей, которое можно разместить
  "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    "description": строка с описанием,
    "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  "location": {
  "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  "y": случайное число, координата y метки на карте от 130 до 630.
  }
}
*/
var TITLES = [];

var COORDS_X = {
  MIN: 100,
  MAX: 900
};

var COORDS_Y = {
  MIN: 100,
  MAX: 900
};

var PRICE = {
  MIN: 100,
  MAX: 2000
};

var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var ROOMS = {
  MIN: 1,
  MAX: 5
};

var GUESTS_COUNT = {
  MIN: 1,
  MAX: 12
};

var TIMES = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var AD_COUNT = 8;

// var PIN_SIZE = {
//   X: 40,
//   Y: 40
// };
