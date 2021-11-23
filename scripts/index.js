import HamburgerComponent from './modules/hamburger.js';
import Swiper from './vendor/swiper-bundle.esm.browser.js';
import './vendor/lightgallery.js';
import FaqAccordion from './modules/faq.js';

// eslint-disable-next-line no-unused-vars
const feedback = new Swiper('.feedback__wrapper', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
  },
  slidesPerView: 2,
});

// eslint-disable-next-line no-unused-vars
const regalia = new Swiper('.regalia__wrapper', {
  loop: true,
  spaceBetween: 80,
  pagination: {
    el: '.regalia__pagination',
  },
});


// eslint-disable-next-line no-undef
lightGallery(document.getElementById('lightgallery'), {
  speed: 500,
  controls: true,
  download: false,
});


const hamburger = new HamburgerComponent('header__nav-list', 'hamburger');
hamburger.init();

const range = document.querySelector('.compare__range');
const before = document.querySelector('.compare__image--before');
const line = document.querySelector('.compare__line');

range.addEventListener('input', (evt) => {
  evt.preventDefault();

  before.style.width = `${range.value}%`;
  line.style.left = `${range.value}%`;
});

const faqAccordion = new FaqAccordion('faq__list');
faqAccordion.init();
