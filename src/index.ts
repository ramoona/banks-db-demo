import banksDB from 'banks-db';
import {
  formatCardNumber,
  getContrastColor,
  getRandomArrayEntry,
} from './helpers';
import './styles.pcss';

type BankInfo = {
  code?: string
  type?: string // TODO add type
  name?: string
  country?: string
  localTitle?: string
  engTitle?: string
  url?: string
  color?: string
  prefixes?: number[]
}

const CSSVars = {
  color: '--card-color',
  bgColor: '--card-bg-color',
  suggestBgColor: '--suggest-bg-color',
  suggestColor: '--suggest-color',
  rotate: '--rotate',
}

const card = document.getElementById('card');
const numberInput = document.getElementById('number');
const bankName = document.getElementById('bank-name');
const suggestedPrefix = document.getElementById('suggested-prefix');
const suggestedBank = document.getElementById('suggested-bank');

function setRandomBank(bank: BankInfo) {
  suggestedPrefix.innerHTML = String(bank.prefixes[0]);
  suggestedBank.innerHTML = bank.engTitle;
  suggestedBank.style.setProperty(CSSVars.suggestBgColor, bank.color);
  suggestedBank.style.setProperty(CSSVars.suggestColor, getContrastColor(bank.color));
}

document.addEventListener('DOMContentLoaded', () => {
  setRandomBank(getRandomArrayEntry<BankInfo>(banksDB.data));
})

numberInput.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, '');
  const formatted = formatCardNumber(raw);
  const bank: BankInfo = banksDB(raw);

  const isUnknownBank = raw.length >= 7 && !bank.code;

  card.setAttribute('data-type', bank.type || '');
  if(bank.color) {
    card.style.setProperty(CSSVars.bgColor, bank.color);
    card.style.setProperty(CSSVars.color, getContrastColor(bank.color));
  } else {
    card.style.setProperty(CSSVars.bgColor, '');
    card.style.setProperty(CSSVars.color, '');
  }

  if (bank.code && card.getAttribute('data-bank') !== `is-${bank.code}`) {
    card.setAttribute('data-bank', '');
    // little hack to trigger CSS animation
    setTimeout(() => card.setAttribute('data-bank', `is-${bank.code}`), 0)
    bankName.innerHTML = bank.engTitle
  } else if (isUnknownBank) {
    card.setAttribute('data-bank', 'unknown');
    bankName.innerHTML = 'Unknown Bank'
  } else if(!bank.code) {
    card.setAttribute('data-bank', '');
    bankName.innerHTML = ''
  }

  input.value = formatted;
});

numberInput.addEventListener('focus', () => {
  card.style.setProperty(CSSVars.rotate, '160deg');
  card.setAttribute('data-focused', '')
})

numberInput.addEventListener('blur', () => {
  card.style.setProperty(CSSVars.rotate, '');
  card.removeAttribute('data-focused')
})
