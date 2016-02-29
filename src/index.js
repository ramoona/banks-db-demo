const banksDB = require('banks-db');
const masker = require('vanilla-masker');

window.onload = function () {
  const cardNumber = document.getElementById('number');
  masker(cardNumber).maskPattern("9999 9999 9999 9999 99");

  cardNumber.oninput = function () {
    const bank = banksDB(cardNumber.value);
    const bankInfo = document.getElementById('card');
    const bankName = document.getElementById('bank-name');
    const cardType = document.getElementById('type');
    const hint = document.querySelector('.hint');

    if ( bank.code ) {
      hint.classList.remove('visible');
      bankInfo.classList.add('is-' + bank.code);
      bankName.innerText = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
      bankName.classList.add('visible');
    } else {
      bankName.classList.remove('visible');
      bankInfo.setAttribute('class', 'card');
      bankName.innerHTML = '';

      if (cardNumber.value.length >= 7) {
        bankName.innerHTML = 'Unknown bank';
        bankName.classList.add('visible');
        hint.classList.add('visible');
      } else {
        hint.classList.remove('visible');
      }
    }

    if ( bank.type ) {
      cardType.innerHTML = bank.type;
      cardType.classList.add('visible');
    } else {
      cardType.innerHTML = '';
      cardType.classList.remove('visible');
    }
  };
};
