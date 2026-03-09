document.querySelector('.nav__toggle').addEventListener('click', function() {
  this.classList.toggle('nav__toggle__opened');
  document.querySelector('.mobile__menu').classList.toggle('mobile__menu__visible');
});

document.querySelector('.menu__buttons').addEventListener('click', function() {
  document.querySelector('.nav__toggle').classList.remove('nav__toggle__opened');
  document.querySelector('.mobile__menu').classList.remove('mobile__menu__visible');
});