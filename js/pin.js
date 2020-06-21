'use strict';

window.pin = (function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var data = window.data;

  var renderPin = function (ad, number) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.style.left = ad.location.x - data.pinSize.x / 2 + 'px';
    pinElement.style.top = ad.location.y + data.pinSize.y + 'px';
    pinElement.number = number;
    return pinElement;
  };

  var createPins = function (ads) {
    var result = [];
    for (var i = 0; i < ads.length; i++) {
      result.push(renderPin(ads[i]));
    }

    return result;
  };

  createPins(window.ads.ads);

  return {
    renderPin: renderPin
  };
})();
