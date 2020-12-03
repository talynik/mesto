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
  elementsList
} from "../utils/constants.js";

import '../pages/index.css';

const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData) {
    const newUser = new UserInfo(formData);
    newUser.setUserInfo();
  }
});

profile.setEventListeners();

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", function() {
  const userInfo = new UserInfo({
    profileName: profileName.textContent,
    profileDescription: profileDescription.textContent
  });
  userInfo.getUserInfo();

  const formValidator = new FormValidator(".popup_profile");
  formValidator.enableValidation();

  profile.open();
});

const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData) {
    const card = new Card(formData, {
      handleCardClick: function(name, link) {
        const openPopupPicture = new PopupWithImage(".popup_picture", {name, link});
        openPopupPicture.open();
      }
    });
    const newElement = card.generateCard();
    elementsList.prepend(newElement);
  }
});

addCard.setEventListeners();

// обработчик открытия попапа добавления места
addPlaceButton.addEventListener("click", function() {

  const formValidator = new FormValidator(".popup_mesto");
  formValidator.enableValidation();

  addCard.open();
});

//перебор данных из массива для добавления карточек
const CardList = new Section({
  data: initialCards,
  renderer: function(item) {
    const card = new Card(item, {
      handleCardClick: function(name, link) {
        const openPopupPicture = new PopupWithImage(".popup_picture", {name, link});
        openPopupPicture.open();
      }
    });
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }
}, elementsList);

CardList.renderItems();