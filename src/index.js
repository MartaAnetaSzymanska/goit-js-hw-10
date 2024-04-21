import axios from 'axios';
import {
  fetchBreeds,
  select,
  breedDetailsBox,
  fetchCatByBreed,
} from './cat-api';

fetchBreeds();

select.addEventListener('click', ev => {
  fetchCatByBreed(ev.target.getAttribute('value'));
});
