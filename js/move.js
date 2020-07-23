'use strict';

window.move = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var data = window.data;
  var mainPinSize = window.data.mainPinSize;

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    // начальные координаты точки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setAddress(mapPinMain.offsetTop, mapPinMain.offsetLeft);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // смещение от начальных координат точки
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      // обновляем стартовые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      checkAndMovePin(shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var checkAndMovePin = function (shift) {

    var currentCoords = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    if (currentCoords.x + mainPinSize.x <= data.coordsX.max &&
        currentCoords.x >= data.coordsX.min &&
        currentCoords.y <= data.coordsY.max &&
        currentCoords.y + mainPinSize.arrow >= data.coordsY.min) {
      mapPinMain.style.left = currentCoords.x + 'px';
      mapPinMain.style.top = currentCoords.y + 'px';

      var newAddressCoords = {
        x: currentCoords.x + Math.floor(mainPinSize.x / 2),
        y: currentCoords.y
      };

      window.form.setAddress(newAddressCoords.x, newAddressCoords.y);
    }
  };

  return {
    onMainPinMouseDown: onMainPinMouseDown
  };
})();
