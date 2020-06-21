'use strict';

window.utils = (function () {
  // генерирует случайное число в заданном диапазоне
  var getRandomNumber = function (min, max) {
    var int = min + Math.random() * (max + 1 - min);
    return Math.floor(int);
  };

  // перемешивает значения массива в случайном порядке
  var shuffleArr = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  };

  return {
    getRandomNumber: function (min, max) {
      return getRandomNumber(min, max);
    },
    getRandomArrElement: function (arr) {
      return arr[getRandomNumber(0, arr.length - 1)];
    },
    generateRandomArray: function (arr) {
      var copiedArr = arr;
      var randomArrLength = getRandomNumber(0, copiedArr.length);
      copiedArr = shuffleArr(copiedArr);
      var features = shuffleArr(copiedArr).slice(0, randomArrLength);
      return features;
    }
  };
})();
