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
  var clearButton = form.querySelector('.ad-form__reset');
  var avatarChooser = form.querySelector('#avatar');
  var photoChooser = form.querySelector('#images');
  var avatarPreview = form.querySelector('.ad-form-header__preview').querySelector('img');
  var photoPreview = form.querySelector('.ad-form__photo');
  var photos = [];
  var exceptionNumbers = data.exceptionNumbers;

  // синхронизирует поля заезда и выезда из номера
  var syncTimes = function (timeItemFrom, timeItemTo) {
    timeItemTo.options[timeItemFrom.selectedIndex].selected = true;
  };
  var syncTypeFromPrice = function () {
    for (var i = 0; i < data.roomTypes.length; i++) {
      if (data.roomTypes[i][typeSelect.value]) {
        priceInput.placeholder = data.roomTypes[i][typeSelect.value].minPrice;
        priceInput.min = data.roomTypes[i][typeSelect.value].minPrice;
        break;
      }
    }
  };

  // синхронизирует тип жилья с ценой жилья
  var getMinPriceForType = function () {
    var minPrice = 0;
    for (var i = 0; i < data.roomTypes.length; i++) {
      if (data.roomTypes[i][typeSelect.value]) {
        minPrice = data.roomTypes[i][typeSelect.value].minPrice;
      }
    }
    return minPrice;
  };

  // синхронизирует количество комнат с количеством мест
  var syncCountGuestsWithRooms = function () {
    var guestCount = roomsSelect.value === exceptionNumbers.roomsNumber ? exceptionNumbers.guestNumber : roomsSelect.value;

    for (var i = 0; i < guestsSelect.options.length; i++) {
      guestsSelect.options[i].disabled = (guestCount === exceptionNumbers.guestNumber) ?
        (guestsSelect.options[i].value !== exceptionNumbers.guestNumber) :
        (guestsSelect.options[i].value > guestCount || guestsSelect.options[i].value === exceptionNumbers.guestNumber);

      guestsSelect.options[i].selected = !guestsSelect.options[i].disabled;
    }
  };

  var generateAddress = function (x, y) {
    return 'x:' + x + ', ' + 'y:' + y;
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
  var setMainPin = function () {
    if (!data.mapMainPinCoordsDefault.x || !data.mapMainPinCoordsDefault.y) {
      data.mapMainPinCoordsDefault = {
        x: parseInt(mapPinMain.style.left, 10) + Math.floor(window.data.mainPinSize.x / 2),
        y: parseInt(mapPinMain.style.top, 10) - window.data.mainPinSize.arrow
      };
    } else {
      mapPinMain.style.left = data.mapMainPinCoordsDefault.x.toString(10) - Math.floor(window.data.mainPinSize.x / 2) + 'px';
      mapPinMain.style.top = data.mapMainPinCoordsDefault.y.toString() - Math.floor(window.data.mainPinSize.x / 2) + 'px';
    }
    setAddress(data.mapMainPinCoordsDefault.x, data.mapMainPinCoordsDefault.y);
  };

  var resetForm = function () {
    form.reset();
    // отключает форму
    window.map.activatePage();
    // убирает пины
    window.map.clearPins();
    syncCountGuestsWithRooms();
    syncTypeFromPrice();
    window.filter.resetFilters();
    setMainPin();
    data.ads = [];
  };

  var successHandler = function () {
    // создает сообщение о успещной отправке данных
    window.messages.createSuccessPopup();
    // сбрасывает значения формы
    resetForm();
  };

  var onChangeType = function () {
    syncTypeFromPrice();
  };

  var onChangeRoomSelect = function () {
    syncCountGuestsWithRooms();
  };

  /*
  * Прослушивание событий
  * */
  checkinSelect.addEventListener('change', function () {
    syncTimes(checkinSelect, checkoutSelect);
  });
  checkoutSelect.addEventListener('change', function () {
    syncTimes(checkoutSelect, checkinSelect);
  });
  typeSelect.addEventListener('change', onChangeType);
  roomsSelect.addEventListener('change', onChangeRoomSelect);


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

  var onClickResetButton = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  clearButton.addEventListener('click', function (evt) {
    onClickResetButton(evt);
  });
  syncTimes(checkinSelect, checkoutSelect);
  syncTypeFromPrice();
  syncCountGuestsWithRooms();
  setMainPin();
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.actions.save(new FormData(form), successHandler, window.messages.createErrorPopup);
  });

  // Загружает аватар
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = data.fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  // Загружает фотографии объявления
  photoChooser.addEventListener('change', function () {
    Array.from(photoChooser.files).forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = data.fileTypes.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = document.createElement('img');
          photo.style.height = '100px';
          photo.style.margin = '5px';
          photo.src = reader.result;
          photoPreview.appendChild(photo);
          photos.push(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  });

  return {
    setAddress: setAddress,
  };
})();
