export default class FormValidator {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputSelector = '.popup__input';
    this._submitButtonSelector = '.popup__button';
    this._inactiveButtonClass = 'popup__button_disabled';
    this._inputErrorClass = 'popup__input_type_error';
    this._errorClass = 'popup__error_visible';
  }

  enableValidation() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
  
    this._setEventListeners(buttonElement);
    this._toggleButtonState(buttonElement, this._form.checkValidity());
  }

  _setEventListeners(buttonElement) {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputs.forEach(input => {
      this._hideError(input);
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
  
        const isAllValid = this._form.checkValidity();
        this._toggleButtonState(buttonElement, isAllValid);
       });
    });
  }

  _checkInputValidity(input) {
    input.setCustomValidity('');
    if (!input.validity.valid) {
        this._showError(input);
    } else {
        this._hideError(input);
    }
  }

  _toggleButtonState(buttonElement, isActive) {
    if (isActive) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._inactiveButtonClass);
    }
  }

  _showError(input) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }
  
  _hideError(input) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }
}