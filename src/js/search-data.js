
const containerGallery = document.querySelector('.gallery');
function createGalleryMarkup (images){
    const galleryCard = images.map(({ id, webformatUR, largeImageURL, tags, likes, views, comments, downloads}) => {
       return ` 
       <a class="gallery__link" href="${webformatUR}">
       <div class="gallery-item" id="${id}">
         <img
                 src="${largeImageURL}"
           alt="${tags}"
           loading="lazy"
           width="400px"
                     />
                     <div class="info">
       <p class="info-item">
               <b>Likes</b>: ${likes}
             </p>
             <p class="info-item">
               <b>Views</b>: ${views}
             </p>
             <p class="info-item">
               <b>Comments</b>: ${comments}
             </p>
             <p class="info-item">
               <b>Downloads</b>: ${downloads}
     </div>
     </a>`
    }
     ).join('');
   
  containerGallery.insertAdjacentHTML('beforeend', galleryCard)

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

 }
 export {createGalleryMarkup}  ;
    