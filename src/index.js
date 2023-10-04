

import { fetchImg } from "./js/fetchImg";
import { createGalleryMarkup } from "./js/search-data";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form')
const containerGallery = document.querySelector('.gallery');
const input = document.querySelector('.input-search')
 


let query = '';
let page = 1;
let simpleLightBox = new SimpleLightbox('.gallery a');
const perPage = 40 ;


form.addEventListener('submit', onSambit)
function onSambit(e) {
  e.preventDefault();
  page = 1;
  query = input.value;
 containerGallery.innerHTML = '';
 

  if (query === '') {
    Notify.failure('The search cannot be empty.');
    return;
  }

  fetchImg(query, page, perPage)
    .then(data => {
   
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images. Please try again.'
        );
   
      } else {

        window.addEventListener('scroll', showMorePage);
        createGalleryMarkup(data.hits);
        const totalPages = Math.ceil(data.totalHits / 40);


        if (page >= totalPages) {
          window.removeEventListener('scroll', showMorePage);
          Notify.failure(
            "We're sorry, but you've reached the end of search results.");
          }
        
        simpleLightBox.refresh();
       Notify.success(
          `We found ${data.total} images of ${query}.`
        );
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    });
}

function onloadMore() {
  page += 1;

  fetchImg(query, page, perPage)
    .then(data => {

    createGalleryMarkup(data.hits);
    simpleLightBox.refresh();
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      window.removeEventListener('scroll', showMorePage);
      Notify.failure(
        "We're sorry, but you've reached the end of search results.");
      
    }

    })
    .catch(error => console.log(error));
}





function showMorePage() {
    if (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      onloadMore();
    }
  }
  
  
  
  arrowTop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  window.addEventListener('scroll', function () {
    arrowTop.hidden = scrollY < document.documentElement.clientHeight;
  });
  
 


