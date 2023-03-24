const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}`).then(resp => {
    if (!resp.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return resp.json();
  });
}
