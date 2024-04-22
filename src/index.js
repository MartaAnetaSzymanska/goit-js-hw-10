import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, fetchCatDetails } from './cat-api';

const select = document.querySelector('select.breed-select');
const breedDetailsBox = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');

select.classList.add('hidden');
error.classList.add('hidden');

fetchBreeds()
  .then(data => {
    loader.classList.add('hidden');
    select.classList.remove('hidden');
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement('option');
      option.value = data[i].id;
      option.innerText = data[i].name;
      select.append(option);
    }
  })
  .catch(err => {
    loader.classList.add('hidden');
    select.classList.add('hidden');
    error.classList.remove('hidden');
    console.log('error', err);
    throw error;
  });

select.addEventListener('change', ev => {
  catInfo.classList.add('hidden');
  loader.classList.remove('hidden');
  let breedId = ev.target.value;
  // console.log(breedId);
  fetchCatByBreed(breedId)
    .then(cats => {
      let cat = cats[0];
      breedDetailsBox.innerHTML = `<img src="${cat.url}" alt ="cat"></img>`;
      catInfo.classList.remove('hidden');
    })
    .catch(err => {
      loader.classList.add('hidden');
      select.classList.add('hidden');
      error.classList.remove('hidden');
      console.log('error', err);
      throw err;
    });

  fetchCatDetails(breedId)
    .then(cats => {
      let cat = cats.find(el => el.id === breedId);
      const markup = `<div><h2 class="title">${cat.name}</h2><p>${cat.description}</p><span class="span-temper">Temperament: </span>${cat.temperament}</div>`;
      breedDetailsBox.insertAdjacentHTML('beforeend', markup);
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
    })
    .catch(err => {
      loader.classList.add('hidden');
      select.classList.add('hidden');
      error.classList.remove('hidden');
      console.log('error', err);
      throw error;
    });
});
