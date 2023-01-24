import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryList.classList.add('is-hidden');
countryInfo.classList.add('is-hidden');

function handleInput() {
  let name = input.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  countryList.classList.add('is-hidden');
  countryInfo.classList.add('is-hidden');

  fetchCountries(name);
}

input.addEventListener('input', _.debounce(handleInput, DEBOUNCE_DELAY));
