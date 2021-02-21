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
  avatarPopupOpenButton,
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
  about: ".profile__description",
  avatar: ".profile__avatar"
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers
});

  //заполнение данных профиля с сервера
api
  .getUserInfo()
  .then((data) => {
    newUser.setUserInfo(data)
  })
  .catch(err=>console.log(err));

  //изменение данных профиля
const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData, button) {
    api
      .editUserInfo(formData)
      .then((data) => {
        newUser.setUserInfo(data)
      })
      .catch(err=>console.log(err))
      .finally(() => {
        renderLoading(false, button);
      });
    renderLoading(true, button);
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

  //изменение аватарки
const avatarPopup = new PopupWithForm(".popup_avatar", {
  handleFormSubmit: function(ava, button) {
    api
      .editAvatar(ava)
      .then((data) => {
        newUser.setUserInfo(data)
      })
      .catch(err=>console.log(err))
      .finally(() => {
        renderLoading(false, button);
      });
    renderLoading(true, button);
  }
});
avatarPopup.setEventListeners();

  //открытие попапа изменения аватарки
avatarPopupOpenButton.addEventListener("click", function() {
  avatarPopup.open();  
});

  //удаление карточек
const openPopupDelete = new PopupWithOk(".popup_delete");
openPopupDelete.setEventListeners();
    
  //функция создания новой карточки
function newCard(item) {
  const card = new Card(
    item,
    "#element-template",
    {idUser: newUser.returnUserId()},
    {handleCardClick: function(name, link) {
      openPopupPicture.open(name, link);
    }},
    {handleClikDelete: (idCard) => {
      openPopupDelete.open(idCard,
      {handleDeleteCard: (idCard) => {
        api
        .removeCard(idCard)
        .then(() => {
          card.delCard();
        })    
        .catch(err=>console.log(err))
      }});
    }},
    {handleClickLike: (onLike, idCard) => {
      if(!onLike) {
        api
          .addLike(idCard)
          .then((data) => {
            card.getLike(data);
          })
          .catch(err=>console.log(err))
      } else {
        api
          .removeLike(idCard)
          .then((data) => {
            card.delLike(data);
          })
          .catch(err=>console.log(err))
      }
    }}
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section((item) => {
    cardList.addItem(newCard(item));
}, elementsList);

  //добавление карточек с сервера
api
  .getCard()
  .then((data) => {
    cardList.renderItems(data);
  })    
  .catch(err=>console.log(err))

  //добавленние новой карточки
const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData, button) {
    renderLoading(true, addCard);
    api
      .addCard(formData)
      .then((data) => {
        cardList.addItem(newCard(data));
      })
      .catch(err=>console.log(err))
      .finally(() => {
        renderLoading(false, button);
      });
    renderLoading(true, button);
  }
});

  // обработчик открытия попапа добавления карточки
addPlaceButton.addEventListener("click", function() {
  addCard.open();
});

addCard.setEventListeners();

const openPopupPicture = new PopupWithImage(".popup_picture", popupImagePicture, popupNamePicture);
openPopupPicture.setEventListeners();


function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = "Сохраненить"
  }
}