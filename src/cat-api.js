import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_VphXHW9UfClNGoRVrJb3ygzZ44h0TOe7bIfGB21lWwSeP86oJJzv8AgjerpfnDgr';

export const select = document.querySelector('select.breed-select');
export const breedDetailsBox = document.querySelector('div.cat-info');

export function fetchBreeds() {
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
    })
    .catch(error => {
      console.log('error', error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    'https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}'
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.text);
      }
      return response.json();
    })
    .then(breed => {
      console.log(breed);
      let cat = breed[0];
      breedDetailsBox.innerHTML =
        '<img src="${cat.url}" alt=""></img><div><h2>${breed.name}</h2><p>${breed.description}</p><span>Temperament:</span>${breed.temperament}<p></p></div>';
    })
    .catch(error => {
      console.log('error', error);
    });
}
