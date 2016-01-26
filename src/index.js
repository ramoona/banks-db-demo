const banksDB = require('banks-db');
const masker = require('vanilla-masker');

window.onload = function () {
  const cardNumberField = document.getElementById('card-number');

  masker(cardNumberField).maskPattern("9999 9999 9999 9999");

  cardNumberField.oninput = function () {
    const cardNumber = cardNumberField.value;
    const bankInfo = document.getElementById('card');
    const bankName = document.getElementById('bank-name');
    const cardType = document.getElementById('card-type');
    const cardTypeFound = 'card__type_visible';
    const bankFound = 'card__bank-name_visible';
    const bank = banksDB(cardNumber);

    if (typeof bank.name !== 'undefined') {
      bankName.innerHTML = bank.engTitle;
      bankName.classList.add(bankFound);
      bankInfo.style.background = bank.color;
    } else {
      bankName.innerHTML = '';
      bankName.classList.remove(bankFound);
      bankInfo.removeAttribute('style');
    }

    if (typeof bank.type !== 'undefined') {
      cardType.innerHTML = bank.type;
      cardType.classList.add(cardTypeFound);
    } else {
      cardType.innerHTML = '';
      cardType.classList.remove(cardTypeFound);
    }
  };
};
