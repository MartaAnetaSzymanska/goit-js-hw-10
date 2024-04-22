import axios from 'axios';
import {
  fetchBreeds,
  select,
  breedDetailsBox,
  fetchCatByBreed,
} from './cat-api';

fetchBreeds();

select.addEventListener('change', ev => {
  let breedId = ev.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId)
    .then(breed => {
      console.log(breed);
      let breedObj = breed[0];
      breedDetailsBox.innerHTML = `<img src="${breedObj.url}" width="300" height="250"></img>`;
    })
    .catch(error => {});
});
