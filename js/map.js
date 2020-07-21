'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var mapPinMinCoordLeft = mapPinMain.style.left;
  var mapPinMinCoordTop = mapPinMain.style.top;
  var popup;
  var popupClose;
  var lastActiveElement;
  var state = window.data;

  // делает страницу активной
  var activatePage = function () {
    mapPinMain.addEventListener('mousedown', window.move.onMainPinMouseDown);

    renderAllPins(window.data.ads);
    map.classList.toggle('map--faded');
    form.classList.toggle('ad-form--disabled');
    // делает все поля формы доступными
    changeActivity();

    /* назначает обработчик showPopups на элемент 'Карта',
       в котором расположены элементы 'Метка объявления на карте'*/
    mapPins.addEventListener('click', onClickPin);

    // удаляет обработчики с элемента 'Главный пин'
    mapPinMain.removeEventListener('mouseup', onClickMainPin);
    mapPinMain.removeEventListener('keydown', onPressKey);
  };

  var renderAllPins = function (data) {
    var numberAds = data.length > window.data.adCount ? window.data.adCount : data.length;
    for (var j = 0; j < numberAds; j++) {
      fragment.appendChild(window.pin.render(data[j], j));
    }
    // добавляет созданные пины в DOM
    mapPins.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }
    mapPinMain.removeEventListener('mousedown', window.move.onMainPinMouseDown);
    mapPinMain.addEventListener('mouseup', onClickMainPin);
    mapPinMain.addEventListener('keydown', onPressKey);
    window.form.setAddress(mapPinMinCoordLeft, mapPinMinCoordTop);
    mapPinMain.style.left = mapPinMinCoordLeft;
    mapPinMain.style.top = mapPinMinCoordTop;
  };

  // изменяет доступность для редактирования
  var changeActivity = function () {
    fieldsets.forEach(function (elem) {
      elem.disabled = !elem.disabled;
    });
  };

  // Делает все поля формы недоступными в момент открытия страницы
  changeActivity();

  var showPopUps = function (evt) {
    var target = evt.target.closest('.map__pin');

    if (target && target !== mapPinMain) {
      if (lastActiveElement) {
        lastActiveElement.classList.remove('map__pin--active');
        popup.remove();
      }
      target.classList.add('map__pin--active');
      lastActiveElement = target;
      var adForRender = window.data.ads.find(function (ad) {
        return ad.offer.title === lastActiveElement.title;
      });
      popup = window.card.renderCard(adForRender);
      map.appendChild(popup);
      window.form.setAddress(lastActiveElement.style.left, lastActiveElement.style.top);
      popupClose = map.querySelector('.popup__close');
      popupClose.addEventListener('click', onClickClose);
      document.addEventListener('keydown', onPressKey);
    }
    if (popup && target === mapPinMain) {
      onClickClose();
    }
  };

  var onClickPin = function () {
    showPopUps();
  };

  var onClickMainPin = function () {
    activatePage();
  };

  var onClickClose = function () {
    if (lastActiveElement) {
      lastActiveElement.classList.remove('map__pin--active');
      popup.classList.add('hidden');
      document.removeEventListener('keydown', onPressKey);
    }
  };
  var onPressKey = function (evt) {
    if (evt.key === state.keys.esc.code) {
      onClickClose();
    }
    if (evt.key === state.keys.enter.code) {
      activatePage();
    }
  };

  // Добавляет обработчики на элемент 'Главный пин'
  mapPinMain.addEventListener('mouseup', onClickMainPin);
  mapPinMain.addEventListener('keydown', onPressKey);

  var updateMap = function () {
    onClickClose();
    state.ads = window.utils.shuffleArr(state.ads);
    clearPins();
    renderAllPins(window.filter.filterAds(state.ads));
  };

  return {
    activatePage: activatePage,
    clearPins: clearPins,
    updateMap: updateMap
  };
})();
