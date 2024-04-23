import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, fetchCatDetails } from './cat-api';

const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catInfoBox = document.querySelector('div.cat-info');

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
    console.error('Network error');
  });

select.addEventListener('change', ev => {
  loader.classList.remove('hidden');
  catInfoBox.classList.add('hidden');
  let breedId = ev.target.value;
  // console.log(breedId);
  let image;
  let cat;
  const promise1 = fetchCatByBreed(breedId)
    .then(images => {
      image = images[0];
    })
    .catch(err => {
      console.error('Image error');
    });
  const promise2 = fetchCatDetails(breedId)
    .then(cats => {
      cat = cats.find(el => el.id === breedId);
    })
    .catch(err => {
      console.error('Description error');
    });
  Promise.all([promise1, promise2])
    .then(() => {
      loader.classList.add('hidden');
      catInfoBox.classList.remove('hidden');
      catInfoBox.innerHTML = `<img src="${image.url}" alt ="cat"></img><div><h2 class="title">${cat.name}</h2><p>${cat.description}</p><span class="span-temper">Temperament: </span>${cat.temperament}</div`;
    })
    .catch(err => {
      loader.classList.add('hidden');
      select.classList.add('hidden');
      error.classList.remove('hidden');
    });
});
