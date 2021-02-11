export default class FormValidator {
  constructor(validation) {
    this._inputSelector = validation.inputSelector;
    this._submitButtonSelector = validation.submitButtonSelector;
    this._inactiveButtonClass = validation.inactiveButtonClass;
    this._inputErrorClass = validation.inputErrorClass;
    this._errorClass = validation.errorClass;
  }

  enableValidation(formPopup) {
    const form = document.querySelector(formPopup);
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  
    this._setEventListeners(form);
    this._toggleButtonState(form.checkValidity());
  }

  _setEventListeners(form) {
    const inputs = Array.from(form.querySelectorAll(this._inputSelector));
    inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
  
        const isAllValid = form.checkValidity();
        this._toggleButtonState(isAllValid);
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

  _toggleButtonState(isActive) {
    if (isActive) {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
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