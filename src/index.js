

import { fetchImg } from "./js/fetchImg";
import { createGalleryMarkup } from "./js/search-data";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.search-form')
const containerGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const input = document.querySelector('.input-search')


let query = '';
let page = 1;
let simpleLightBox;



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

  fetchImg(query, page)
    .then(ress => {
      if (ress.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images. Please try again.'
        );
      } else {
        window.addEventListener('scroll', showMorePage);

        createGalleryMarkup(ress.hits);
        simpleLightBox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
       Notify.success(
          `We found ${ress.totalHits} images of ${query}.`
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
  simpleLightBox.destroy();

  fetchImg(query, page)
    .then(data => {
     createGalleryMarkup(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      const totalPages = Math.ceil(data.totalHits / 40);

      const lastEL = document.querySelector('.gallery').lastChild;
      if (lastEL) {
        infinite.obverce(lastEL);
      }

      if (page > totalPages) {
        Notiflix.Notify.failure("You've reached the end of search results.");
      }
    })
    .catch(error => console.log(error));
}



// function onSambit(event) {
//    event.preventDefault()


// query = event.currentTarget.elements.searchQuery.value;

//       page = 1;
// containerGallery.innerHTML = '';

// if(query === ''){
// Notify.warning(" Please compled.");
// return
// }

// fetchImg(query, page)
//     try {res => {
//       if (res.totalHits === 0) {
//      Notify.failure(
//           'Sorry, there are no images. Please try again.'
//         );
//       } else {
//        createGalleryMarkup(res.hits);
//         simpleLightBox = new SimpleLightbox('.gallery a').refresh()
    
    
      
//    };
//        Notify.success(
//           `We found ${res.totalHits} images.`
//         );
//       }
//     }
//     catch(error){
//       console.log(error)}
//     finally{() => {
//       form.reset();
//     };
//   }
  

// }
    


// function onloadMore() {
//    page += 1;
//    simpleLightBox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
//  simpleLightBox.destroy();
 
//    fetchImg(query, page)
//      .then(response => {
//        createGalleryMarkup(response.hits);
//        simpleLightBox = new SimpleLightbox('.gallery a', {
//          captionsData: 'alt',
//          captionDelay: 250,
//        });
 
//        const totalPages = Math.ceil(response.totalHits / 40);


 
//        const lastEL = document.querySelector('.gallery').lastChild;
//        if (lastEL) {
//          infinite.obverce(lastEL);
//        }
 
//        if (page > totalPages) {
//         Notify.failure("You've reached the end of search results.");
//        }
//      })
//      .catch(error => console.log(error));
//     }









function showMorePage() {
  if (
    window.innerHeight + window.pageYOffset >=
    document.documentElement.scrollHeight
  ) {
    onloadMore();
  }
}





 
