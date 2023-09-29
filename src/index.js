
// import { galleryItems } from './gallery-items';
import { fetchImg } from "./js/fetchImg";
import { createGalleryMarkup } from "./js/search-data";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.search-form')
const containerGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');



let query = '';
let page = 1;
let simpleLightBox;

// const perPage = 40;

form.addEventListener('submit', onSambit)

function onSambit(event) {
   event.preventDefault()


query = event.currentTarget.elements.searchQuery.value;

      page = 1;
containerGallery.innerHTML = '';

if(query === ''){
Notify.warning(" Please compled.");
return
}

fetchImg(query, page)
    .then(res => {
      if (res.totalHits === 0) {
     Notify.failure(
          'Sorry, there are no images. Please try again.'
        );
      } else {
       createGalleryMarkup(res.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
    
        // simpleLightBox = new SimpleLightbox('.gallery a', {
        //   captionsData: 'alt',
        //   captionDelay: 250,
        // });

      
   };
      //  Notify.success(
      //     `We found ${res.totalHits} images.`
      //   );
      }
    )
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    });

  

}
    


  
   //  const lightbox = new SimpleLightbox('.gallery a', {
   //    captionsData: 'alt',
   //    captionDelay: 250,
   // });

   


function onloadMore() {
   page += 1;
   simpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
 simpleLightBox.destroy();
 
   fetchImg(query, page)
     .then(response => {
       createGalleryMarkup(response.hits);
       simpleLightBox = new SimpleLightbox('.gallery a', {
         captionsData: 'alt',
         captionDelay: 250,
       });
 
       const totalPages = Math.ceil(response.totalHits / 40);

       
 
       const lastEL = document.querySelector('.gallery').lastChild;
       if (lastEL) {
         infinite.obverce(lastEL);
       }
 
       if (page > totalPages) {
        Notify.failure("You've reached the end of search results.");
       }
     })
     .catch(error => console.log(error));
    }















 
