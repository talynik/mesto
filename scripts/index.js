const popup = document.querySelector(".popup");
const buttonOpenPopup = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClose = document.querySelector(".popup__close");
const popapForm = document.querySelector(".popup__form");

const popupToggle = () => {
  popup.classList.toggle("popup_opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClose.addEventListener("click", popupToggle);

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputsName = document.querySelector('#name');
let inputDiscription = document.querySelector('#description');
inputsName.setAttribute('value', profileName.textContent);
inputDiscription.setAttribute('value', profileDescription.textContent);

const popupTextContent = (event) => {
  event.preventDefault();
  profileName.textContent = inputsName.value;
  profileDescription.textContent = inputDiscription.value;
  popupToggle();
}

popapForm.addEventListener("submit", popupTextContent);