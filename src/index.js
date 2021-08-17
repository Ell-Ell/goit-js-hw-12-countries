import { debounce } from 'lodash';
import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import { onTooManyMatches, FETCH_ERRORS } from './js/errors';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import './sass/main.scss';
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';

refs.inputName.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  clearCountryContainer();

  const searchQuery = e.target.value.trim();
  if (searchQuery === '') {
    return;
  }
  fetchCountries(searchQuery)
    .then(arrayOfContries => {
      if (arrayOfContries.length === 1) {
        return renderCountryCard(arrayOfContries);
      }
      if (arrayOfContries.length > 10) {
        return onTooManyMatches();
      }
      refs.countrysRender.addEventListener('click', onCountriesListClick);
      return renderCountryList(arrayOfContries);
    })
    .catch(error => {
      FETCH_ERRORS[error.message]();
    });
}
function renderCountryCard(country) {
  refs.countrysRender.insertAdjacentHTML('beforeend', countryCardTpl(country));
}

function renderCountryList(countries) {
  refs.countrysRender.innerHTML = countriesListTpl(countries);
}
function onCountriesListClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const countryName = e.target.dataset.name;
  clearCountryContainer();
  fetchCountries(countryName).then(renderCountryCard);
}

function clearCountryContainer() {
  refs.countrysRender.innerHTML = '';
}
