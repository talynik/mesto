import Section from "../components/Section.js";
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  profilePopupOpenButton,
  profileName,
  profileDescription,
  addPlaceButton,
  initialCards,
  elementsList,
  validation
} from "../utils/constants.js";

import '../pages/index.css';

const user = new UserInfo({
  name: profileName,
  description: profileDescription
});

const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData) {
    user.getUserInfo(formData);
  }
});

profile.setEventListeners();

const formValidator = new FormValidator(validation);

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", function() {
  user.setUserInfo();
  profile.open();
  formValidator.enableValidation(".popup__form_profile");
});

const openPopupPicture = new PopupWithImage(".popup_picture");
openPopupPicture.setEventListeners();

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
  formValidator.enableValidation(".popup__form_mesto");
});