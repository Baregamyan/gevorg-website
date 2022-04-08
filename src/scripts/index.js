import HamburgerComponent from './modules/hamburger.js';
import Swiper from './vendor/swiper-bundle.esm.browser.js';
import './vendor/lightgallery.min.js';
import './vendor/BeerSlider.js';
import FaqAccordion from './modules/faq.js';

// eslint-disable-next-line no-unused-vars
const feedbackSlider = new Swiper('.feedback__wrapper', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
  },
  slidesPerView: 2,
});

// eslint-disable-next-line no-unused-vars
const regaliaSlider = new Swiper('.regalia__wrapper', {
  spaceBetween: 80,
  pagination: {
    el: '.regalia__pagination',
  },
  autoHeight: true,
});

// eslint-disable-next-line no-unused-vars
const compareSlider = new Swiper('.compare__swiper', {
  spaceBetween: 80,
  loop: true,
  pagination: {
    el: '.compare__pagination',
  },
  allowTouchMove: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const hamburger = new HamburgerComponent('header__nav-list', 'hamburger');
hamburger.init();

const faqAccordion = new FaqAccordion('faq__list');
faqAccordion.init();

// eslint-disable-next-line no-undef
lightGallery(document.querySelector('.regalia__list'), {
  selector: '.regalia__item',
  loop: false,
  download: false,
});

// eslint-disable-next-line no-undef
document.querySelectorAll('.compare__picture').forEach((slider) => new BeerSlider(slider));
