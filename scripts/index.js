const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenPopup = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_profile")
const popupFormProfile = document.querySelector(".popup__form_profile");
const buttonCloseProfile = document.querySelector(".popup__close_profile");
const inputProfileName = document.querySelector("#name");
const inoutProfileDescription = document.querySelector("#description");

const popupMesto = document.querySelector(".popup_mesto")
const popupFormMesto = document.querySelector(".popup__form_mesto");
const buttonCloseMesto = document.querySelector(".popup__close_mesto");
const inputMestoName = document.querySelector("#name-mesto");
const inoutMestoLink = document.querySelector("#url-mesto");

const popupPicture = document.querySelector(".popup_picture");
const popupClosePicture = document.querySelector(".popup__close_picture");
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

//функция открытия и закрытия попапов
const popupToggle = (form) => {
  form.classList.toggle("popup_opened");
}


const closePopupEscape = (formEscape) => {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") 
      {popupToggle(formEscape)};
  });
  document.removeEventListener('keydown', (evt) => {
    if(evt.key === "Escape") 
      {popupToggle(formEscape)};
  });
}

//обработка события открытие попа изменения профиля
buttonOpenPopup.addEventListener("click", () => {
  popupToggle(popupProfile);
  popupContentProfile();
  closePopupEscape(popupProfile)
});

//функция изменения данных профиля
const popupTextContent = (event) => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inoutProfileDescription.value;
  popupToggle(popupProfile);
}

//задание начальных значений в попапе профиля
const popupContentProfile = () => {
  inputProfileName.value = profileName.textContent;
  inoutProfileDescription.value = profileDescription.textContent;
  popupFormProfile.addEventListener("submit", popupTextContent);
}

// обработчик закрытия попапа профиля
buttonCloseProfile.addEventListener("click", () => {popupToggle(popupProfile)});

// обработчик открытия попапа добавления места
buttonAdd.addEventListener("click", () => {popupToggle(popupMesto)});

// обработчик закрытия попапа нового места
buttonCloseMesto.addEventListener("click", () => {popupToggle(popupMesto)});

// функция передачи данных для нового места
const popupContentMesto = (event) => {
  event.preventDefault();

  const mestoItem = addElementMesto({
    name: inputMestoName.value,
    link: inoutMestoLink.value
  });

  elementsList.prepend(mestoItem);
  popupToggle(popupMesto);
};

// обработчик события добавления нового места
popupFormMesto.addEventListener("submit", popupContentMesto);

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
  popupToggle(popupPicture);
}

//закрытие попапа с изображением
popupClosePicture.addEventListener("click", () => {popupToggle(popupPicture)});

//перебор данных из массива для добавления карточек
initialCards.forEach((data) => {
  const elementMesto = addElementMesto(data);
  elementsList.append(elementMesto);
});
