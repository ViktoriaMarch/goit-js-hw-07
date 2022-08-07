import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// створили розмітку


const galleryEl = document.querySelector(".gallery");


function createSmallGallery(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
  <a 
  class="gallery__link" 
  href=${original}>
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`})
         .join('');
        }
// вивели розмітку в документ

    galleryEl.innerHTML = createSmallGallery(galleryItems);

    
// делегування на div

    galleryEl.addEventListener("click", onPhotoClick);

// функція відкриття модалки

    function onPhotoClick(ev) {
      ev.preventDefault();
      if(ev.target.nodeName !== "IMG") {
        return;
      }

      // const newUrl = ev.target.dataset.source;
      const lightboxSetting = {
        onShow: () => {
          document.addEventListener('keydown', onEscape);
        },
        onClose: () => {
          document.removeEventListener('keydown', onEscape);
        }
      }

  const lightbox = basicLightbox.create(`
      <img
      class = "gallery__image"
      src = ${ev.target.dataset.source}
      data-source = ${galleryEl.original}
      alt = ${galleryEl.description}
    />`,
  lightboxSetting
  );
  lightbox.show();
      
       
// функція закриття

    function onEscape(ev) {
      if (ev.code === 'Escape' && lightbox.visible()) {
        lightbox.close();
      }
    };
  }
   