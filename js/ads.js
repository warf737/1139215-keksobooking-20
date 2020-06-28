'use strict';

window.ads = (function () {
  // var utils = window.utils;
  // var data = window.data;
  //
  // // формирует строку вида img/avatars/user08.png
  // var getUserAvatar = function (number) {
  //   var path = 'img/avatars/user0';
  //   var format = '.png';
  //   return path + number + format;
  // };
  //
  // // получаем количество гостей в зависимости от количества комнат
  // var getNumberRooms = function (rooms) {
  //   var numberOfRoom = 'не для гостей';
  //
  //   if (rooms !== 100) {
  //     var guestCount = utils.getRandomNumber(1, rooms);
  //     numberOfRoom = guestCount > 1 ?
  //       'для ' + guestCount + ' гостей' :
  //       'для ' + guestCount + ' гостя';
  //   }
  //   return numberOfRoom;
  // };
  //
  // // создает одно объявление
  // var createAd = function (number) {
  //   var x = utils.getRandomNumber(data.coordsX.min, data.coordsX.max);
  //   var y = utils.getRandomNumber(data.coordsY.min, data.coordsY.max);
  //
  //   var checkin = utils.getRandomArrElement(data.times);
  //   var checkout = utils.getRandomArrElement(data.times);
  //   var descriptions = utils.getRandomArrElement(data.titles);
  //   var roomsNumber = utils.getRandomArrElement(data.roomsCount);
  //   var guestsNumber = getNumberRooms(roomsNumber);
  //   var features = utils.generateRandomArray(data.features);
  //   var roomType = utils.getRandomArrElement(data.roomTypes);
  //   var photos = utils.generateRandomArray(data.photos);
  //
  //   return {
  //     author: {
  //       avatar: getUserAvatar(number + 1)
  //     },
  //     offer: {
  //       title: descriptions.title,
  //       address: x + ', ' + y,
  //       price: roomType.minPrice,
  //       type: roomType.type,
  //       rooms: roomsNumber,
  //       guests: guestsNumber,
  //       checkin: 'после ' + checkin,
  //       checkout: 'до ' + checkout,
  //       features: features,
  //       description: descriptions.description,
  //       photos: photos,
  //     },
  //     location: {
  //       x: x,
  //       y: y
  //     }
  //   };
  // };

  var ads = [];
  var createAds = function (data) {
    for (var i = 0; i < data.length; i++) {
      ads.push(data[i]);
    }
    return ads;
  };

  var loadDataPins = function () {
    window.actions.load(createAds, window.utils.errorHandler);
  };

  loadDataPins();

  return {
    ads: ads
  };
})();
