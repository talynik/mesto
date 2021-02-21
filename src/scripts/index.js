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
  avatar,
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
    avatar.src = data.avatar;
    newUser.setUser(data);
  })
  .catch(err=>console.log(err));

  //изменение данных профиля
const profile = new PopupWithForm(".popup_profile", {
  handleFormSubmit: function(formData, button) {
    apiUser
      .editTask(formData)
      .then((data) => {
        newUser.setUserInfo({
          name: data.name,
          about: data.about
        })
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
    apiUser
      .editAvatar(ava)
      .then((data) => {
        avatar.src = data.avatar;
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
const openPopupDelete = new PopupWithOk(
  ".popup_delete",
  {handleDeleteCard: (idCard) => {
    apiCards
    .removeTask(idCard)
    .then(() => {
      card.deleteCard();
    })    
    .catch(err=>console.log(err))
  }}
);
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
      openPopupDelete.open(idCard);
    }},
    {handleClickLike: (onLike, idCard) => {
      if(!onLike) {
        apiCards
          .addLike(idCard)
          .then(() => {
            card.getLike();
          })
          .catch(err=>console.log(err))
      } else {
        apiCards
          .removeLike(idCard)
          .then(() => {
            card.delLike();
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
apiCards
  .getAllTasks()
  .then((data) => {
    cardList.renderItems(data);
  })    
  .catch(err=>console.log(err))

  //добавленние новой карточки
const addCard = new PopupWithForm(".popup_mesto", {
  handleFormSubmit: function(formData, button) {
    renderLoading(true, addCard);
    apiCards
      .addTask(formData)
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