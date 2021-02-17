import Api from "../components/Api.js";
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
  elementsList,
  popupImagePicture,
  popupNamePicture,
  validation
} from "../utils/constants.js";

import '../pages/index.css';

const newUser = new UserInfo({
  name: ".profile__name",
  about: ".profile__description"
});

const apiUser = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
  headers: {
    authorization: 'e2df783e-1573-46ac-9a48-a1dc05d4a045',
    'Content-Type': 'application/json'
  }
});

//заполнение данных профиля с сервера
apiUser
  .getAllTasks()
  .then((data) => {
    newUser.setUserInfo({
      name: data.name,
      about: data.about
    })
    const avatar = document.querySelector('.profile__avatar');
    avatar.src = data.avatar;
  })
  .catch(err=>console.log(err));

const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards',
  headers: {
    authorization: 'e2df783e-1573-46ac-9a48-a1dc05d4a045',
    'Content-Type': 'application/json'
  }
});

//добавление карточек с сервера
apiCards
.getAllTasks()
.then((data) => {
  const initialCards = data.map(item=>{
    return {
      name: item.name,
      link: item.link,
      id: item._id,
      likes: item.likes.length,
      owner: item.owner._id
    }
  });
  const cardList = new Section({
    data: initialCards,
    renderer: function(item) {
      cardList.addItem(newCard(item));
    }
  }, elementsList);
  cardList.renderItems();
})
.catch(err=>console.log(err))

const formProfileValidator = new FormValidator(validation, ".popup__form_profile");
formProfileValidator.enableValidation();

const formMestoValidator = new FormValidator(validation, ".popup__form_mesto");
formMestoValidator.enableValidation();

const formAvatarValidator = new FormValidator(validation, ".popup__form_avatar");
formAvatarValidator.enableValidation();

const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData) {
    apiUser
      .editTask(formData)
      .then((data) => {
        newUser.setUserInfo({
          name: data.name,
          about: data.about
        })
      })
      .catch(err=>console.log(err));
  }
});

profile.setEventListeners();

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", function() {
  const user = newUser.getUserInfo();
  profileNameInput.value = user.name;
  profileDescriptionInput.value = user.about;
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

//добавленние новой карточки
const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData) {
    apiCards
      .addTask(formData)
      .then((data) => {
        cardList.addItem(
          newCard({
            name: data.name,
            link: data.link,
            likes: data.likes.length,
            owner: data.owner._id
          })
        )
      })
      .catch(err=>console.log(err))
  }
});

addCard.setEventListeners();

// обработчик открытия попапа добавления места
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});