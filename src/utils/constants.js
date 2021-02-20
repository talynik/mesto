export const profilePopupOpenButton = document.querySelector(".profile__edit-button");
export const addPlaceButton  = document.querySelector(".profile__add-button");
export const profileNameInput = document.querySelector("#name");
export const profileDescriptionInput = document.querySelector("#about");
export const placePopupNameInput = document.querySelector("#name-mesto");
export const placePopupLinkInput = document.querySelector("#url-mesto");
export const elementsList = document.querySelector(".elements__list");
export const popupImagePicture = document.querySelector(".popup__picture_image");
export const popupNamePicture = document.querySelector(".popup__picture_name");
export const avatar = document.querySelector('.profile__avatar');
export const avatarPopupOpenButton = document.querySelector(".profile__edit-avatar");
export const popupButton = document.querySelector(".popup__button");

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

//   https://1001puzzle.ru/upload/iblock/656/65681eeab856f92b586e8bc6c8ef6b3a.jpg

//  https://i.stack.imgur.com/BdqMQ.jpg?s=328&g=1