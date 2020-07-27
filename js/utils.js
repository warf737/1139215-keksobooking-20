'use strict';

window.utils = (function () {

  // перемешивает значения массива в случайном порядке
  var shuffleArr = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var debounce = function (action, interval) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, interval);
  };

  var isExistingElement = function (array, value) {
    return array.find(function (item) {
      return item === value;
    });
  };
  return {
    errorHandler: errorHandler,
    debounce: debounce,
    shuffleArr: shuffleArr,
    isExistingElement: isExistingElement
  };
})();
