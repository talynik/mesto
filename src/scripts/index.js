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

const userInfo = new UserInfo({profileName, profileDescription});

userInfo.getUserInfo();

const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData) {
    newUser.setUserInfo(formData);
  }
});

profile.setEventListeners();

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", function() {
  profile.open();
});

const openPopupPicture = new PopupWithImage(".popup_picture");
openPopupPicture.setEventListeners();


const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData) {
    const card = new Card(formData, {
      handleCardClick: function(name, link) {
        openPopupPicture.open(name, link);
      }
    });
    const newElement = card.generateCard();
    elementsList.prepend(newElement);
  }
});

addCard.setEventListeners();

// обработчик открытия попапа добавления карточки
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});

//перебор данных из массива для добавления карточек
const cardList = new Section({
  data: initialCards,
  renderer: function(item) {
    const card = new Card(item, {
      handleCardClick: function(name, link) {
        openPopupPicture.open(name, link);
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsList);

cardList.renderItems();

const formValidator = new FormValidator();
formValidator.enableValidation();