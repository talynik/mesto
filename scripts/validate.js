// функция изменения инпутов при отрицательной валидности
function showError(input, {inputErrorClass}) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = input.validationMessage;
}

// функция изменения инпутов при положительной валидности
function hideError(input, {inputErrorClass}) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.textContent = '';
}

// функция изменения состояния кнопки
function toggleButtonState(buttonElement, isActive, {inactiveButtonClass}) {
  if (isActive) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
  } else {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
  }
}

// проверяем валидность инпутов и запускаем соответствующие функции
function checkInputValidity(input, {...rest}) {
  input.setCustomValidity('');
  if (!input.validity.valid) {
      showError(input, rest);
  } else {
      hideError(input, rest);
  }
}

// находим все элементы ввода в формах
function setEventListeners(formElement, buttonElement, {inputSelector, ...rest}) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    //отслеживаем ввод данных
  inputs.forEach(input => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(evt.target, rest);

      // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
      const isAllValid = formElement.checkValidity();
      toggleButtonState(buttonElement, isAllValid, rest);
     });
  });
}

// находим все формы на странице и отключаем их отправку (перезагрузку страницы)
function enableValidation({formSelector, submitButtonSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // находим кнопки отправки форм
    const buttonElement = form.querySelector(submitButtonSelector);

    setEventListeners(form, buttonElement, rest);
    toggleButtonState(buttonElement, form.checkValidity(), rest);
  });
}

// вызов функции
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});