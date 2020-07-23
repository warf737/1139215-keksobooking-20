'use strict';

window.load = (function () {

  var createAds = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.data.ads.push(data[i]);
    }
    window.map.activatePage();
  };

  var loadDataPins = function () {
    window.actions.load(createAds, window.utils.errorHandler);
  };

  return {
    loadDataPins: loadDataPins
  };
})();
