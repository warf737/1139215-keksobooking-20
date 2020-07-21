'use strict';

window.messages = (function () {
  var body = document.querySelector('body');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorMessageButton = errorMessage.querySelector('.error__button');

  var onPressKey = function (evt) {
    if (evt.key === 'Escape') {
      onClickClosePopup();
    }
  };

  var onClickClosePopup = function () {
    successMessage.remove();
    errorMessage.remove();
    document.removeEventListener('keydown', onPressKey);
    document.removeEventListener('click', onClickClosePopup);

    if (errorMessageButton) {
      errorMessageButton.removeEventListener('click', onClickClosePopup);
    }
  };

  var onClickDocument = function () {
    onClickClosePopup();
  };

  var createSuccessPopup = function () {
    body.appendChild(successMessage);
    document.addEventListener('keydown', onPressKey);
    document.addEventListener('click', onClickDocument);
  };

  var createErrorPopup = function () {
    body.appendChild(errorMessage);
    document.addEventListener('keydown', onPressKey);
    document.addEventListener('click', onClickDocument);
    errorMessageButton.addEventListener('click', onClickClosePopup);
  };

  return {
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup
  };
})();
