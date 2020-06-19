'use strict';

window.ads = (function () {
  var utils = window.utils;
  var data = window.data;

  // формирует строку вида img/avatars/user08.png
  var getUserAvatar = function (number) {
    var path = 'img/avatars/user0';
    var format = '.png';
    return path + number + format;
  };

  // получаем количество гостей в зависимости от количества комнат
  var getNumberRooms = function (rooms) {
    var numberOfRoom = 'не для гостей';

    if (rooms !== 100) {
      var guestCount = utils.getRandomNumber(1, rooms);
      numberOfRoom = guestCount > 1 ?
        'для ' + guestCount + ' гостей' :
        'для ' + guestCount + ' гостя';
    }
    return numberOfRoom;
  };

  // создает одно объявление
  var createAd = function (number) {
    var x = utils.getRandomNumber(data.coordsX.min, data.coordsX.MAX);
    var y = utils.getRandomNumber(data.coordsY.MIN, data.coordsY.MAX);

    var checkin = utils.getRandomArrElement(data.times);
    var checkout = utils.getRandomArrElement(data.times);
    var descriptions = utils.getRandomArrElement(data.titles);
    var roomsNumber = utils.getRandomArrElement(data.roomsCount);
    var guestsNumber = getNumberRooms(roomsNumber);
    var features = utils.generateRandomArray(data.features);
    var roomType = utils.getRandomArrElement(data.roomTypes);
    var photos = utils.generateRandomArray(data.photos);

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

  var createAds = function () {
    var adArray = [];
    for (var i = 0; i < data.adCount; i++) {
      var ad = createAd(i);
      adArray.push(ad);
    }
    return adArray;
  };

  var ads = createAds();

  return {
    ads: ads
  };
})();
