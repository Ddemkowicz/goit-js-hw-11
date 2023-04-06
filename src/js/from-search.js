import Notiflix from 'notiflix';

const log = console.log;

const key = '35091080-36e54d1ab1b489bab378e0aed';
const URL_API = 'https://pixabay.com/api/';
const URL_PARAMETERS =
  '&image_type=photo&orientation=horizontal&safesearch=true';
// https://pixabay.com/api/?key=35091080-36e54d1ab1b489bab378e0aed&q=cat&image_type=photo&orientation=horizontal&safesearch=true

const btnSearch = document.querySelector('.btn');
const formSearch = document.querySelector('.search-form');
const inputSearch = document.querySelector('.search-form input');
const gallery = document.querySelector('.gallery');

const fetchImages = async () => {
  const response = await fetch(
    `${URL_API}?key=${key}&q=${inputSearch.value}${URL_PARAMETERS}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const arr = await response.json();
  return arr;
};

btnSearch.addEventListener('click', async e => {
  e.preventDefault();
  log(inputSearch.value);
  log;
});
