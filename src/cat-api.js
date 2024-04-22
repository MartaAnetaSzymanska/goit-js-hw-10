import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_VphXHW9UfClNGoRVrJb3ygzZ44h0TOe7bIfGB21lWwSeP86oJJzv8AgjerpfnDgr';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(breeds => {
    return breeds.data;
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
