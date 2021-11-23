const range = document.querySeletor('.compare__range');
const before = document.querySelector('.compare__image--before');
const after = document.querySelector('.compate__image--after');
const line = document.querySelector('.compare__line');

range.addEventListener('input', (evt) => {
  evt.preventDefault();

  before.style.width = `${range.value}%`;
  line.style.position.left = `${range.value}%`;

  after.style.width = `${100 - range.value}%`;
});
