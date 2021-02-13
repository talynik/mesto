export default class FormValidator {
  constructor(validation, formPopup) {
    this._inputSelector = validation.inputSelector;
    this._inactiveButtonClass = validation.inactiveButtonClass;
    this._inputErrorClass = validation.inputErrorClass;
    this._errorClass = validation.errorClass;
    this._form = document.querySelector(formPopup);
    this._buttonElement = this._form.querySelector(validation.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState(this._form.checkValidity());
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
  
        const isAllValid = this._form.checkValidity();
        this._toggleButtonState(isAllValid);
       });
    });

    this._form.addEventListener('reset', () => {
      inputs.forEach((inputElement) => {
          this._hideError(inputElement);
          this._toggleButtonState(false);
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