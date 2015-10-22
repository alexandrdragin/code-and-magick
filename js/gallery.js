'use strict';

//  вызов анонимной функции
(function() {

  var Key = {
    'ESC': 27,
    'LEFT': 37,
    'RIGHT': 39
  };

  var photogalleryContainer = document.querySelector('.photogallery');
  var gallery = document.querySelector('.overlay-gallery');
  var closeButtton = gallery.querySelector('.overlay-gallery-close');


  function doesHaveParent(element, className) {
    do {
      if (element.classList.contains(className)) {
        return !element.classList.contains('gallery-nophoto');
      }
      element = element.parentElement;
    } while (element);

    return false;
  }

  function hideGallery() {
    gallery.classList.add('invisible');
    closeButtton.removeEventListener('click', closeHandler);
    document.body.removeEventListener('keydown', keyHandler);
  }

  function closeHandler(event) {
    event.preventDefault();
    hideGallery();
  }

  function showGallery() {
    gallery.classList.remove('invisible');
    closeButtton.addEventListener('click', closeHandler);
    document.body.addEventListener('keydown', keyHandler);
  }

  function keyHandler(evt) {
    switch (evt.keyCode) {
      case Key.LEFT:
        console.log('Left');
        break;
      case Key.RIGHT:
        console.log('Right');
        break;
      case Key.ESC:
        hideGallery();
        break;
      default: break;
    }
  }

  photogalleryContainer.addEventListener('click', function(evt) {
    if (doesHaveParent(evt.target, 'photogallery' )) {
      showGallery();
    }
  });


})();
