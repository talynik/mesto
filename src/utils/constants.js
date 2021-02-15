export const profilePopupOpenButton = document.querySelector(".profile__edit-button");
export const addPlaceButton  = document.querySelector(".profile__add-button");
export const profileNameInput = document.querySelector("#name");
export const profileDescriptionInput = document.querySelector("#description");
export const placePopupNameInput = document.querySelector("#name-mesto");
export const placePopupLinkInput = document.querySelector("#url-mesto");
export const elementsList = document.querySelector(".elements__list");
export const popupImagePicture = document.querySelector(".popup__picture_image");
export const popupNamePicture = document.querySelector(".popup__picture_name");

//конфигурационный объект валидации
export const validation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__visible-error'
};