import Section from "../components/Section.js";
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  profilePopupOpenButton,
  profileNameInput,
  profileDescriptionInput,
  addPlaceButton,
  initialCards,
  elementsList,
  popupImagePicture,
  popupNamePicture,
  validation
} from "../utils/constants.js";

import '../pages/index.css';

const newUser = new UserInfo({
  name: ".profile__name",
  info: ".profile__description"
});

const formProfileValidator = new FormValidator(validation, ".popup__form_profile");
formProfileValidator.enableValidation();

const formMestoValidator = new FormValidator(validation, ".popup__form_mesto");
formMestoValidator.enableValidation();

const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData) {
    newUser.setUserInfo(formData);
  }
});

profile.setEventListeners();

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", function() {
  const user = newUser.getUserInfo();
  profileNameInput.value = user.name;
  profileDescriptionInput.value = user.description;
  profile.open();  
});

const openPopupPicture = new PopupWithImage(".popup_picture", popupImagePicture, popupNamePicture);
openPopupPicture.setEventListeners();

//функция создания новой карточки
function newCard(item) {
  const card = new Card(item, "#element-template", {
    handleCardClick: function(name, link) {
      openPopupPicture.open(name, link);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

//перебор данных из массива для добавления карточек
const cardList = new Section({
  data: initialCards,
  renderer: function(item) {
    cardList.addItem(newCard(item));
  }
}, elementsList);

cardList.renderItems();

//добавленние новой карточки
const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData) {
    cardList.addItem(newCard(formData));
  }
});

addCard.setEventListeners();

// обработчик открытия попапа добавления места
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});