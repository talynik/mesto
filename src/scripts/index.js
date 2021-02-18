import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithOk from "../components/PopupWithOk";
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
  validation,
  url,
  headers
} from "../utils/constants.js";

import '../pages/index.css';

const newUser = new UserInfo({
  name: ".profile__name",
  about: ".profile__description"
});

const apiUser = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
  headers
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
    const idUser = data._id;
    return idUser;
  })
  .then((idUser) => {
    
      //функция создания новой карточки
    function newCard(item) {
      const card = new Card(item, "#element-template", idUser, {
        handleCardClick: function(name, link) {
          openPopupPicture.open(name, link);
        }
      });
      const cardElement = card.generateCard();
      return cardElement;
    }

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
  })
  .catch(err=>console.log(err));
  
const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards',
  headers
});

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

// обработчик открытия попапа добавления карточки
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});

/* const deleteButton = document.querySelectorAll('.element__button-delete');

popupDelete = document.querySelector(".popup_deletee");
deleteButton.addEventListener('click', function () {
  const Card = deleteButton.closest('.element');
  const popupOk = new PopupWithOk(popupDelete,)
  deleteButton.closest('.element').remove();
}); */