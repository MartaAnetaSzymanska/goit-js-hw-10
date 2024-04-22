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
  fetchCatByBreed(breedId);
});
