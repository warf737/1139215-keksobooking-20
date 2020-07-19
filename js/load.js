'use strict';

(function () {

  var createAds = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.data.ads.push(data[i]);
    }
  };

  var loadDataPins = function () {
    window.actions.load(createAds, window.utils.errorHandler);
  };

  loadDataPins();
})();
