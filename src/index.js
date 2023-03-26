import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const guard = document.querySelector('.guard');

let page = 1;
let search = null;
let total = 0;

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoadMore, options);

function onSubmit(evt) {
  evt.preventDefault();
  clearMarkup();
  const { searchQuery } = evt.currentTarget.elements;
  if (!searchQuery.value.trim()) {
    alert('Please enter correct value');
    return;
  }
  fetchPictures(searchQuery.value, page).then(data => {
    if (!data.hits.length) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    total += data.hits.length;
    createMarkup(data.hits);
    observer.observe(guard);
    // btnLoadMore.hidden = false;
  });

  search = searchQuery.value;
}

async function fetchPictures(query, searcgPage) {
  const resp = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${searcgPage}&per_page=40`
  );
  return resp.data;
}

function onLoadMore() {
  page += 1;
  fetchPictures(search, page).then(data => {
    if (total >= data.totalHits) {
      //   btnLoadMore.hidden = true;
      observer.unobserve(guard);
      alert("We're sorry, but you've reached the end of search results.");
      return;
    }
    total += data.hits.length;
    createMarkup(data.hits);
  });
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href="${largeImageURL}">
  <img src=${webformatURL} alt=${tags} loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  gallery.innerHTML = '';
  page = 1;
  total = 0;
}

// const lightbox = new SimpleLightbox('.photo-card a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
