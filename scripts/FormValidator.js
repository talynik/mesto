export default class FormValidator {
  constructor() {
    this._formSelector = '.popup__form';
    this._inputSelector = '.popup__input';
    this._submitButtonSelector = '.popup__button';
    this._inactiveButtonClass = 'popup__button_disabled';
    this._inputErrorClass = 'popup__input_type_error';
    this._errorClass = 'popup__error_visible';
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
  
    forms.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      const buttonElement = form.querySelector(this._submitButtonSelector);
  
      this._setEventListeners(form, buttonElement);
      this._toggleButtonState(buttonElement, form.checkValidity());
    });
  }

  _setEventListeners(formElement, buttonElement) {
    const inputs = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
  
        const isAllValid = formElement.checkValidity();
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