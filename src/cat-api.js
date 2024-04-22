import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_VphXHW9UfClNGoRVrJb3ygzZ44h0TOe7bIfGB21lWwSeP86oJJzv8AgjerpfnDgr';

export const select = document.querySelector('select.breed-select');
export const breedDetailsBox = document.querySelector('div.cat-info');
export const loadingNotification = document.querySelector('p.loader');
export const errorNotification = document.querySelector('p.error');

export function fetchBreeds() {
  loadingNotification.hidden = false;
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.text);
      }
      return response.json();
    })
    .then(breeds => {
      // console.log(breeds);
      for (let i = 0; i < breeds.length; i++) {
        let option = document.createElement('option');
        option.value = breeds[i].id;
        option.innerText = breeds[i].name;
        select.append(option);
      }
      loadingNotification.hidden = true;
      select.hidden = false;
    })
    .catch(error => {
      console.log('error', error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
export function fetchCatDetails() {
  return axios.get('https://api.thecatapi.com/v1/breeds/').then(response => {
    return response.data;
  });
}
