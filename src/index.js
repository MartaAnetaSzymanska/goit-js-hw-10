import axios from 'axios';
import {
  fetchBreeds,
  select,
  breedDetailsBox,
  fetchCatByBreed,
  fetchCatDetails,
} from './cat-api';

fetchBreeds();

select.addEventListener('change', ev => {
  let breedId = ev.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId)
    .then(data => {
      console.log(data);
      let breedObj = data[0];
      breedDetailsBox.innerHTML = `<img src="${breedObj.url}" width="300" height="250"></img>`;
    })
    .catch(error => {});

  fetchCatDetails(breedId).then(data => {
    let breedObj = data[0];
    const markup = `<div><h2>${breedObj.name}</h2><p>${breedObj.description}</p><span>Temperament:</span>${breedObj.temperament}<p></p></div>`;
    breedDetailsBox.insertAdjacentHTML('beforeend', markup);
  });
});
