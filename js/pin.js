'use strict';

window.pin = (function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var state = window.data;

  var renderPin = function (ad, number) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.style.left = ad.location.x - state.pinSize.x / 2 + 'px';
    pinElement.style.top = ad.location.y + state.pinSize.y + 'px';
    pinElement.number = number;
    return pinElement;
  };

  return {
    renderPin: renderPin
  };
})();
