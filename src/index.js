import { debounce } from 'lodash';
import fetchCountries from "./js/fetchCountries";
import  { refs } from './js/refs';
import { error } from "@pnotify/core";
import '@pnotify/core/dist/PNotify.css';
import "@pnotify/core/dist/BrightTheme.css";




import './sass/main.scss';
import countriesListTpl from "./templates/countries-list.hbs";
import countryCardTpl from "./templates/country-card.hbs";


refs.inputName.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    clearCountryContainer();

    const searchQuery = e.target.value.trim();

    if (searchQuery !== '') {
        fetchCountries(searchQuery).then(arrayOfContries => {
            if (arrayOfContries.length > 10) {
                return onFetchError();
            }
            if (arrayOfContries.length >= 2 && arrayOfContries.length <= 10) {
                refs.countrysRender.addEventListener('click', onCountriesListClick)
                return renderCountryList(arrayOfContries);
            }
            if (arrayOfContries.length === 1) {
                return renderCountryCard(arrayOfContries);
            }
        })
            .catch(onFetchError);
    }
};
function renderCountryCard(country) {
    refs.countrysRender.insertAdjacentHTML('beforeend', countryCardTpl(country));
};

function renderCountryList(countries) {
    refs.countrysRender.innerHTML = countriesListTpl(countries);
};
function onCountriesListClick(e) {
    if (e.target.nodeName !== 'li') { 
    return;
    // if (e.target.nodeName !== 'LI')
}

let countryName = e.target.dataset.name;
clearCountryContainer();
fetchCountries(countryName).then(renderCountryCard);
}

function clearCountryContainer() {
refs.countrysRender.innerHTML = '';
}

function onFetchError() {
error({
   text: 'Too many matches found. Please enter a more specific query!',
   sticker: false,
   hide: true,
   delay: 1500,
});
}