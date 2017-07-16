

var banksDB = require('banks-db');
var masker = require('vanilla-masker');

var cardNumber = document.getElementById('number');
var bankInfo = document.getElementById('card');
var bankName = document.getElementById('bank-name');
var cardType = document.getElementById('type');
var hint = document.getElementById('hint');
var userCountry = navigator.language.replace(/[a-z]*-/, '').toLowerCase();

masker(cardNumber).maskPattern('9999 9999 9999 9999 99');

cardNumber.addEventListener('input', function() {
  var bank = banksDB(cardNumber.value);

  if (bank.code) {
    hint.classList.remove('visible');
    bankInfo.classList.add('is-' + bank.code);
    bankName.innerHTML = bank.country === userCountry ? bank.localTitle : bank.engTitle;
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

  if (bank.type) {
    cardType.innerHTML = bank.type;
    cardType.classList.add('visible');
  } else {
    cardType.innerHTML = '';
    cardType.classList.remove('visible');
  }
});
