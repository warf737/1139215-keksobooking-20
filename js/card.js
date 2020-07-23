'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var ROOMS_COUNT = {min: 1, max: 100};
  var GUESTS_COUNT = {min: 1, max: 2};

  var generateArticleRooms = function (numberRooms) {
    var article = ' комната ';
    if (numberRooms > ROOMS_COUNT.min && numberRooms < ROOMS_COUNT.max) {
      article = ' комнаты ';
    }
    if (numberRooms === ROOMS_COUNT.max || numberRooms < ROOMS_COUNT.min) {
      article = ' комнат ';
    }
    return article;
  };

  var generateArticleGuests = function (numberGuests) {
    return numberGuests !== GUESTS_COUNT.min ? numberGuests + ' гостей' : numberGuests + ' гость';
  };

  var getType = function (adType) {
    var type = adType;
    for (var i = 0; i < window.data.roomTypes.length; i++) {
      if (window.data.roomTypes[i][type]) {
        adType = window.data.roomTypes[i][type].type;
      }
    }
    return adType;
  };

  var renderCard = function (ad) {
    var mapElement = cardTemplate.cloneNode(true);
    var featureList = mapElement.querySelector('.popup__features');
    var photos = mapElement.querySelector('.popup__photos');
    var articleRoom = generateArticleRooms(ad.offer.rooms);
    var articleGuests = generateArticleGuests(ad.offer.guests);
    mapElement.querySelector('.popup__title').textContent = ad.offer.title;
    mapElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    mapElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    mapElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
    mapElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + articleRoom + articleGuests;
    mapElement.querySelector('.popup__text--time').textContent = 'Заезд ' + ad.offer.checkin + ', выезд ' + ad.offer.checkout;
    mapElement.querySelector('.popup__description').textContent = ad.offer.description;
    mapElement.querySelector('.popup__avatar').src = ad.author.avatar;

    featureList.innerHTML = '';
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featureElement = '<li class="popup__feature popup__feature--' + ad.offer.features[i] + '"></li>';
      featureList.insertAdjacentHTML('afterbegin', featureElement);
    }

    photos.innerHTML = '';
    for (var j = 0; j < ad.offer.photos.length; j++) {
      var photo = '<img src= "' + ad.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      photos.insertAdjacentHTML('afterbegin', photo);
    }
    return mapElement;
  };

  return {
    renderCard: renderCard
  };
})();
