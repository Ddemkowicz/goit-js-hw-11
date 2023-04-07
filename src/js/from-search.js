import Notiflix from 'notiflix';

const log = console.log;

const key = '35091080-36e54d1ab1b489bab378e0aed';
const URL_API = 'https://pixabay.com/api/';
const URL_PARAMETERS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=';

// https://pixabay.com/api/?key=35091080-36e54d1ab1b489bab378e0aed&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1

const btnSearch = document.querySelector('.btn');
const formSearch = document.querySelector('.search-form');
const inputSearch = document.querySelector('.search-form input');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

// Funkcja "feczująca"
async function fetchImages(name) {
  const response = await fetch(
    `${URL_API}?key=${key}&q=${inputSearch.value}${URL_PARAMETERS}1`
  );
  const arr = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  } else if (arr.hits.length == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return arr.hits;
}

// Obsługa przycisku szukania
btnSearch.addEventListener('click', async e => {
  e.preventDefault();
  log(inputSearch.value);

  const name = inputSearch.value;
  const photosArr = await fetchImages(name);
  log(photosArr);

  gallery.innerHTML = '';

  for (const photo of photosArr) {
    gallery.innerHTML += ` <div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photo.downloads}</b>
    </p>
  </div>
</div>`;
  }

  btnLoadMore.classList.remove('is-hidden');
});

// Obsługa przycisku "Load more"
let page = 1;
btnLoadMore.addEventListener('click', async e => {
  btnLoadMore.classList.toggle('is-hidden');
  page++;
  const response = await fetch(
    `${URL_API}?key=${key}&q=${inputSearch.value}${URL_PARAMETERS}${page}`
  );
  const arr = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  } else if (arr.hits.length == 0) {
    btnLoadMore.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    returt;
  }
  const photosArr = arr.hits;
  log(photosArr);
  for (const photo of photosArr) {
    gallery.innerHTML += ` <div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photo.downloads}</b>
    </p>
  </div>
</div>`;
  }
  btnLoadMore.classList.toggle('is-hidden');
});

// =======================================

/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
