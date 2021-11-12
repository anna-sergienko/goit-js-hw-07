import { galleryItems } from './gallery-items.js';
// Change code below this line

const imgContainer = document.querySelector(".gallery");
const imgMarkup = createImgCard(galleryItems);

imgContainer.insertAdjacentHTML("beforeend", imgMarkup);

console.log(createImgCard(galleryItems));




function createImgCard(galleryItems) {
    
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img 
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
    }).join("");
 
    
};


let currentIndex = 0;

const options = {
    onShow: (instance) => {
        window.addEventListener("keydown", pressEsc);
        
    },

    onClose: (instance) => {
        window.removeEventListener("keydown", pressEsc);
       
    }

}
const instance = basicLightbox.create(
        `<img src="" width="800" height="600">`, options
)
    
imgContainer.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return
    };
    
  let imgLink = event.target.getAttribute("data-source");
  
    originalLink(imgLink);
    currentIndex = Number(event.target.getAttribute("data-index"));
    instance.show();
    
   
});

function originalLink(url) {
    instance.element().querySelector("img").src = url
}


function pressEsc({ key }) {
  switch (key) {
      
        case "ArrowRight":
            currentIndex += 1
        if (currentIndex >= galleryItems.length) {
            currentIndex = 0
        }
      
        originalLink(galleryItems[currentIndex].original)
      break;
    
        case "ArrowLeft":
            currentIndex -= 1
            if (currentIndex <= 0) {
                currentIndex = galleryItems.length - 1
            }
      
            originalLink(galleryItems[currentIndex].original)
      break;
    
        case "Escape":
            instance.close();
            break;
        
        default:
            break;
    }
    }



