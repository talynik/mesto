export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const profilePopupOpenButton = document.querySelector(".profile__edit-button");
export const addPlaceButton  = document.querySelector(".profile__add-button");
export const profileNameInput = document.querySelector("#name");
export const profileDescriptionInput = document.querySelector("#description");
export const placePopupNameInput = document.querySelector("#name-mesto");
export const placePopupLinkInput = document.querySelector("#url-mesto");
export const elementsList = document.querySelector(".elements__list");
export const popupImagePicture = document.querySelector(".popup__image_picture");
export const popupNamePicture = document.querySelector(".popup__name_picture");

//конфигурационный объект валидации
export const validation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//массив первоначальных данных
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];