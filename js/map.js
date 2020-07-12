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

  // делает страницу активной
  var activatePage = function () {
    mapPinMain.addEventListener('mousedown', window.move.onMainPinMouseDown);

    for (var j = 0; j < window.ads.ads.length; j++) {
      fragment.appendChild(window.pin.renderPin(window.ads.ads[j], j));
    }
    // добавляет созданные пины в DOM
    mapPins.appendChild(fragment);
    map.classList.toggle('map--faded');
    form.classList.toggle('ad-form--disabled');

    // делает все поля формы доступными
    changeActivity();

    /* назначает обработчик showPopups на элемент 'Карта',
       в котором расположены элементы 'Метка объявления на карте'*/
    mapPins.addEventListener('click', showPopUps);

    // удаляет обработчики с элемента 'Главный пин'
    mapPinMain.removeEventListener('mouseup', activatePage);
    mapPinMain.removeEventListener('keydown', onMainPinPressEnter);
  };

  var clearPins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }
    mapPinMain.removeEventListener('mousedown', window.move.onMainPinMouseDown);
    mapPinMain.addEventListener('mouseup', activatePage);
    mapPinMain.addEventListener('keydown', onMainPinPressEnter);
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

  // активирует страницу при нажатии клавиши Enter если есть фокус на главном пине
  var onMainPinPressEnter = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  // Делает все поля формы недоступными в момент открытия страницы
  changeActivity();

  // Добавляет обработчики на элемент 'Главный пин'
  mapPinMain.addEventListener('mouseup', activatePage);
  mapPinMain.addEventListener('keydown', onMainPinPressEnter);

  var showPopUps = function (evt) {
    var target = evt.target.closest('.map__pin');

    if (target && target !== mapPinMain) {
      if (lastActiveElement) {
        lastActiveElement.classList.remove('map__pin--active');
        popup.remove();
      }
      target.classList.add('map__pin--active');
      lastActiveElement = target;
      popup = window.card.renderCard(window.ads.ads[lastActiveElement.number]);
      map.appendChild(popup);
      window.form.setAddress(lastActiveElement.style.left, lastActiveElement.style.top);
      popupClose = map.querySelector('.popup__close');
      popupClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', onPopupEscPress);

    }
    if (popup && target === mapPinMain) {
      closePopup();
    }
  };
  var closePopup = function () {
    lastActiveElement.classList.remove('map__pin--active');
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };
  return {
    activatePage: activatePage,
    clearPins: clearPins
  };
})();
