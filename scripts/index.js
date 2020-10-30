const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePopupOpenButton = document.querySelector(".profile__edit-button");
const addPlaceButton  = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector(".popup_profile")
const profilePopupForm = document.querySelector(".popup__form_profile");
const profileNameInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");

const addCardPopup = document.querySelector(".popup_mesto")
const placePopupForm = document.querySelector(".popup__form_mesto");
const placePopupNameInput = document.querySelector("#name-mesto");
const placePopupLinkInput = document.querySelector("#url-mesto");

const picturePopup = document.querySelector(".popup_picture");
const popupImagePicture = document.querySelector(".popup__image_picture");
const popupNamePicture = document.querySelector(".popup__name_picture");

const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector('#element-template');

//массив первоначальных данных
const initialCards = [
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

//функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

//функция закрытия попапов
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

//функция регистрации нажатия на оверлей или крестик
const handleOverlayAndCloseButtonClick = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('section'));
  }
}

// слушатели попапов
profilePopup.addEventListener('click', handleOverlayAndCloseButtonClick);
addCardPopup.addEventListener('click', handleOverlayAndCloseButtonClick);
picturePopup.addEventListener('click', handleOverlayAndCloseButtonClick);

// функция закрытия попапов по нажатию на Escape
const closePopupEscape = (formEscape) => {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
      formEscape.classList.remove("popup_opened");
    }
  });
}

//обработка события открытие попа изменения профиля
profilePopupOpenButton.addEventListener("click", () => {
  openPopup(profilePopup);
  popupContentProfile();
});

//функция изменения данных профиля
const popupTextContent = (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
}

//задание начальных значений в попапе профиля
const popupContentProfile = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profilePopupForm.addEventListener("submit", popupTextContent);
}

// обработчик открытия попапа добавления места
addPlaceButton .addEventListener("click", () => {
  openPopup(addCardPopup);
});

// функция передачи данных для нового места
const popupContentMesto = (event) => {
  event.preventDefault();

  const mestoItem = addElementMesto({
    name: placePopupNameInput.value,
    link: placePopupLinkInput.value
  });

  elementsList.prepend(mestoItem);
  closePopup(addCardPopup);
};

// обработчик события добавления нового места
placePopupForm.addEventListener("submit", popupContentMesto);

// функция добавления карточек
// elementDetails -> {link: '', name: ''}
const addElementMesto = (elementDetails) => {
  const elementMesto = elementTemplate.cloneNode(true).content;

  const elementName = elementMesto.querySelector(".element__name");
  const elementImage = elementMesto.querySelector(".element__image");

  elementImage.addEventListener("click", () => handleImagePreview(elementDetails));

  elementName.textContent = elementDetails.name;
  elementImage.src = elementDetails.link;
  elementImage.alt = elementDetails.name;

  //реализация добавления лайков
  elementMesto.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //реализация удаления карточек
  const deleteButton = elementMesto.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', function () {
    const listElement = deleteButton.closest('.element');
    listElement.remove();
  });

  return elementMesto;
};

//формирование данных открытия попапа для изображения
const handleImagePreview = (details) => {
  popupImagePicture.src = details.link;
  popupImagePicture.alt = `Изображение ${details.name}`;
  popupNamePicture.textContent = details.name;
  openPopup(picturePopup);
}

//перебор данных из массива для добавления карточек
initialCards.forEach((data) => {
  const elementMesto = addElementMesto(data);
  elementsList.append(elementMesto);
});