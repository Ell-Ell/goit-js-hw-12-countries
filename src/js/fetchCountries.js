import { ERRORS } from './errors';

const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`)
    .catch(error => {
      console.log(error);
      throw new Error(ERRORS.CATCH);
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(ERRORS.FETCH);
      }
    });
}
