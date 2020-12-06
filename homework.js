import galleryData from './gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightbox: document.querySelector('.js-lightbox'),
    closeLightboxBttn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('lightbox__overlay')
}

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

galleryData.forEach(({preview, original, description}) => {
    refs.galleryList.insertAdjacentHTML('afterbegin',
    `<li class="gallery__item">
        <a
            class="gallery__link"
            href=${original}
        >
            <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
            />
        </a>
    </li>`)
 } 
) 

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.galleryList.addEventListener('click', openLightboxWindow);

function openLightboxWindow (event) {
    event.preventDefault();
    console.log(event.target);

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const eventTarget = event.target;
    const originalImgUrl = eventTarget.dataset.source;
    const imageAlt = eventTarget.getAttribute('alt');

// Открытие модального окна по клику на элементе галереи.
    refs.lightbox.classList.add('is-open');
    setOriginalImageSrc(originalImgUrl, imageAlt);
}

// Подмена значения атрибута src элемента img.lightbox__image.
function setOriginalImageSrc(src = '', alt = '') {
    refs.lightboxImage.setAttribute('src', src);
    refs.lightboxImage.setAttribute('alt', alt);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.closeLightboxBttn.addEventListener('click', closeLightboxWindow);

function closeLightboxWindow() {
    refs.lightbox.classList.remove('is-open');

// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
    setOriginalImageSrc();
}

//Закрытие модального окна по нажатию клавиши ESC.
document.addEventListener('keydown', escBttnAction);

function escBttnAction(event) {
    if (event.keyCode === 27) {
        refs.lightbox.classList.remove('is-open');
    }
};

// Закрытие модального окна по клику на div.lightbox__overlay.
refs.lightbox.addEventListener('click', closeLightboxByOverlay);

function closeLightboxByOverlay(event) {
    if (event.target.nodeName !== 'IMG') {
        refs.lightbox.classList.remove('is-open');
    }
}