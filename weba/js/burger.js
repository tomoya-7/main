function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById('js-hamburger');
  var blackBg = document.getElementById('js-black-bg');

  hamburger.addEventListener('click', function() {
    body.classList.toggle('nav-open');
    body.classList.toggle('ban-scroll');
  });
  blackBg.addEventListener('click', function() {
    body.classList.remove('nav-open');
    body.classList.remove('ban-scroll');
  });
}
toggleNav();