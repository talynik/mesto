export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const profilePopupOpenButton = document.querySelector(".profile__edit-button");
export const addPlaceButton  = document.querySelector(".profile__add-button");
export const profileNameInput = document.querySelector("#name");
export const profileDescriptionInput = document.querySelector("#description");
export const placePopupNameInput = document.querySelector("#name-mesto");
export const placePopupLinkInput = document.querySelector("#url-mesto");
export const elementsList = document.querySelector(".elements__list");

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