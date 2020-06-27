'use strict';

window.actions = (function () {
  var ErrorCode = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего на найдено',
    500: 'Ошибка сервера'
  };
  var TIMEOUT_IN_MS = 10000;
  var URL = 'https://javascript.pages.academy/keksobooking/';

  var request = function (req, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        req(xhr.response);
      } else {
        error(ErrorCode[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      error('Привышен интервал ожидания запроса');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };


  var load = function (req, error) {
    var xhr = request(req, error);
    xhr.open('GET', URL + 'data');
    xhr.send();
  };

  var send = function(data, req, error) {
    var xhr = request(req, error);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  return {
    load: load,
    send: send
  };
})();
