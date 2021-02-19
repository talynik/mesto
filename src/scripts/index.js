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
  headers
} from "../utils/constants.js";

import '../pages/index.css';

const formProfileValidator = new FormValidator(validation, ".popup__form_profile");
formProfileValidator.enableValidation();

const formMestoValidator = new FormValidator(validation, ".popup__form_mesto");
formMestoValidator.enableValidation();

const formAvatarValidator = new FormValidator(validation, ".popup__form_avatar");
formAvatarValidator.enableValidation();

const newUser = new UserInfo({
  name: ".profile__name",
  about: ".profile__description"
});

const apiUser = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
  headers
});
  
const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards',
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
    newUser.setUserId(data._id);
  })
  .catch(err=>console.log(err));
    
  //функция создания новой карточки
function newCard(item) {
  const card = new Card(
    item,
    "#element-template",
    {idUser: newUser.returnUserId()}, {
    handleCardClick: function(name, link) {
      openPopupPicture.open(name, link);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section((item) => {
    cardList.addItem(newCard(item));
}, elementsList);

  //добавление карточек с сервера
apiCards
  .getAllTasks()
  .then((data) => {
    //console.log(data);
    cardList.renderItems(data);
  })    
  .catch(err=>console.log(err))

  //добавленние новой карточки
const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData) {
    apiCards
      .addTask(formData)
      .then((data) => {
        cardList.addItem(newCard(data));
      })
      .catch(err=>console.log(err))
  }
});

  // обработчик открытия попапа добавления карточки
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});

addCard.setEventListeners();


  //изменение данных профиля
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


/* const deleteButton = document.querySelector('.element__button-delete');
console.log(deleteButton);

const openPopupDelete = new PopupWithOk(".popup_delete", popupImagePicture, popupNamePicture);
openPopupDelete.setEventListeners();

deleteButton.addEventListener('click', function () {
  const Card = deleteButton.closest('.element');
  const popupOk = new PopupWithOk(popupDelete,)
  deleteButton.closest('.element').remove();
  openPopupDelete.open();
});
 */