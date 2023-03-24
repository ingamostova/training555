import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searcInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const container = document.querySelector('.country-info');

searcInput.addEventListener(
  'input',
  debounce(() => {
    if (!searcInput.value.trim()) {
      container.innerHTML = '';
      list.innerHTML = '';
      return;
    }
    fetchCountries(searcInput.value)
      .then(data => {
        if (data.length >= 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (data.length >= 2) {
          createMarkup(data);
          return;
        }
        createMarkupForOneCountry(data);
      })
      .catch(error => Notify.failure(error.message));
  }, DEBOUNCE_DELAY)
);

function createMarkup(arr) {
  const markup = arr
    .map(
      ({ name, flags }) =>
        `<li><img src=${flags.svg} alt="" width="50"><h2>${name.common}</h2></li>`
    )
    .join('');
  container.innerHTML = '';
  list.innerHTML = markup;
}

function createMarkupForOneCountry(arr) {
  const markup = arr
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li><img src=${flags.svg} alt="" width="200"><h2>${
          name.common
        }</h2><p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(
          languages
        )}</p></li>`
    )
    .join('');
  list.innerHTML = '';
  container.innerHTML = markup;
}
