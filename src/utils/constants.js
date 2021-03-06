export const profilePopupOpenButton = document.querySelector(".profile__edit-button");
export const addPlaceButton  = document.querySelector(".profile__add-button");
export const profileNameInput = document.querySelector("#name");
export const profileDescriptionInput = document.querySelector("#about");
export const elementsList = document.querySelector(".elements__list");
export const popupImagePicture = document.querySelector(".popup__picture_image");
export const popupNamePicture = document.querySelector(".popup__picture_name");
export const avatarPopupOpenButton = document.querySelector(".profile__edit-avatar");

//конфигурационный объект валидации
export const validation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__visible-error'
};
  
export const headers = {
    authorization: 'e2df783e-1573-46ac-9a48-a1dc05d4a045',
    'Content-Type': 'application/json'
};