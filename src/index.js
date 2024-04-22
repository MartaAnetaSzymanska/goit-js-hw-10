import axios from 'axios';
import {
  fetchBreeds,
  select,
  breedDetailsBox,
  fetchCatByBreed,
  fetchCatDetails,
  loadingNotification,
  errorNotification,
} from './cat-api';

const catInfo = document.querySelector('div.cat-info');

fetchBreeds();

select.addEventListener('change', ev => {
  let breedId = ev.target.value;
  // console.log(breedId);
  loadingNotification.hidden = false;
  fetchCatByBreed(breedId)
    .then(data => {
      let breedObj = data[0];
      breedDetailsBox.innerHTML = `<img src="${breedObj.url}" width="300" height="250"></img>`;
    })
    .catch(error => {});

  fetchCatDetails(breedId).then(data => {
    let breedObj = data.find(el => el.id === breedId);
    const markup = `<div><h2>${breedObj.name}</h2><p>${breedObj.description}</p><span>Temperament:</span>${breedObj.temperament}<p></p></div>`;
    breedDetailsBox.insertAdjacentHTML('beforeend', markup);
  });
  loadingNotification.hidden = true;
  catInfo.hidden = false;
});
