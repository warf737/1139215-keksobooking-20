'use strict';

window.messages = (function () {
  var body = document.querySelector('body');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorMessageButton = errorMessage.querySelector('.error__button');

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  var closePopup = function () {
    successMessage.remove();
    errorMessage.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closePopup);

    if (errorMessageButton) {
      errorMessageButton.removeEventListener('click', closePopup);
    }
  };

  var onDocumentClick = function () {
    closePopup();
  };

  var createSuccessPopup = function () {
    body.appendChild(successMessage);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onDocumentClick);
  };

  var createErrorPopup = function () {
    body.appendChild(errorMessage);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onDocumentClick);
    errorMessageButton.addEventListener('click', closePopup);
  };

  return {
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup
  };
})();
