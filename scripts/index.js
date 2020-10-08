const popup = document.querySelector(".popup");
const buttonOpenPopup = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClose = document.querySelector(".popup__close");
const buttonSubmit = document.querySelector(".popup__submit-button");

const popupToggle = () => {
  popup.classList.toggle("popup_opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClose.addEventListener("click", popupToggle);

const popupTextContent = () => {
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");
  let inputs = document.querySelectorAll('input');
  profileName.textContent = inputs[0].value;
  profileDescription.textContent = inputs[1].value;
}

buttonSubmit.addEventListener("click", popupTextContent);
buttonSubmit.addEventListener("click", popupToggle);