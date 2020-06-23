'use strict';

window.form = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');
  var titleInput = form.querySelector('#title');
  var checkinSelect = form.querySelector('#timein');
  var checkoutSelect = form.querySelector('#timeout');
  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');
  var data = window.data;

  // синхронизирует поля заезда и выезда из номера
  var syncTimes = function (timeItemFrom, timeItemTo) {
    timeItemTo.options[timeItemFrom.selectedIndex].selected = true;
  };
  var syncTypeFromPrice = function () {
    for (var i = 0; i < data.roomTypes.length; i++) {
      if (data.roomTypes[i].value === typeSelect.value) {
        priceInput.min = data.roomTypes[i].minPrice;
        break;
      }
    }
  };

  // синхронизирует тип жилья с ценой жилья
  var getMinPriceForType = function () {
    var minPrice = 0;
    for (var i = 0; i < data.roomTypes.length; i++) {
      if (data.roomTypes[i].value === typeSelect.value) {
        minPrice = data.roomTypes[i].minPrice;
      }
    }
    return minPrice;
  };

  // синхронизирует количество гостей с типом выбранного жилья
  var syncCountGuestsWithRooms = function () {
    var guestCount = (roomsSelect.value === '100') ? '0' : roomsSelect.value;

    for (var i = 0; i < guestsSelect.options.length; i++) {
      guestsSelect.options[i].disabled = (guestCount === '0') ?
        (guestsSelect.options[i].value !== '0') :
        (guestsSelect.options[i].value > guestCount || guestsSelect.options[i].value === '0');
    }
  };

  var generateAddress = function (x, y) {
    return 'top:' + y + ', ' + 'left:' + x;
  };
  var regExpCoord = function (coordinate) {
    var type = typeof coordinate;
    if (type === 'string') {
      coordinate = coordinate.replace(/[^+\d.]/g, '');
    }
    return coordinate;
  };
  var setAddress = function (coordLeft, coordTop) {
    var x = regExpCoord(coordLeft);
    var y = regExpCoord(coordTop);
    addressInput.value = generateAddress(x, y);
  };

  // устанавливает координаты главного пина в строку адреса при загрузке страницы
  var mapPinMainCoords = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top + Math.floor(window.data.mainPinSize.y / 2) + window.data.mainPinSize.arrow
  };
  addressInput.value = generateAddress(mapPinMainCoords.x, mapPinMainCoords.y);

  checkinSelect.addEventListener('change', function () {
    syncTimes(checkinSelect, checkoutSelect);
  });
  checkoutSelect.addEventListener('change', function () {
    syncTimes(checkoutSelect, checkinSelect);
  });
  typeSelect.addEventListener('change', syncTypeFromPrice);
  roomsSelect.addEventListener('change', syncCountGuestsWithRooms);

  // Выделяет неверно заполненные поля красной рамкой
  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '2px solid red';
  }, true);

  // Выводит сообщение при неправильно заполненном заголовке
  // и выделяет неверно заполненные поля красной рамкой
  titleInput.addEventListener('input', function () {
    var inputError;
    if (!titleInput.validity.valid) {
      titleInput.style.outline = '2px solid red';
    }
    if (titleInput.validity.tooShort) {
      inputError = 'Заголовок должен состоять не менее чем из 30 символов. Сейчас символов: ' + titleInput.value.length;
    } else if (titleInput.validity.tooLong) {
      inputError = 'Заголовок не должен превышать 100 символов';
    } else if (titleInput.validity.valueMissing) {
      inputError = 'Поле обязательно для заполнения';
    } else {
      inputError = '';
      titleInput.style.outline = '';
    }
    titleInput.setCustomValidity(inputError);
  });

  /* Выводит сообщение при неправильно заполненной цене
  и выделяет неверно заполненные поля красной рамкой */
  priceInput.addEventListener('input', function () {
    var inputError;
    if (!priceInput.validity.valid) {
      priceInput.style.outline = '2px solid red';
    }
    if (priceInput.validity.rangeUnderflow) {
      inputError = 'Цена для данного типа жилья не может быть менее ' + getMinPriceForType(priceInput) + ' p.';
    } else if (priceInput.validity.rangeOverflow) {
      inputError = 'Цена не может быть более 1000000 р.';
    } else if (priceInput.validity.valueMissing) {
      inputError = 'Поле обязательно для заполнения';
    } else {
      inputError = '';
      priceInput.style.outline = '';
    }
    priceInput.setCustomValidity(inputError);
  });

  syncTimes(checkinSelect, checkoutSelect);
  syncTypeFromPrice();
  syncCountGuestsWithRooms();

  return {
    setAddress: setAddress,
  };
})();
