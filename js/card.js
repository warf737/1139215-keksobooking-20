'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
