/* global GalleryPicture: true */

'use strict';

//  вызов анонимной функции
(function() {

  /**
   * Список констант кодов нажатых клавиш для обработки
   * клавиатурных событий.
   * @enum {number}
   */
  var Key = {
    'ESC': 27,
    'LEFT': 37,
    'RIGHT': 39
  };

  /**
   * Конструктор объекта фотогалереи. Создает свойства, хранящие ссылки на элементы
   * галереи, служебные данные (номер показанной фотографии и список фотографий)
   * и фиксирует контекст у обработчиков событий.
   * @constructor
   */
  var Gallery = function() {

    this._photos = new Backbone.Collection();

    // блок со всеми фото
    this.photogalleryContainer = document.querySelector('.photogallery');
    //блок оверлея
    this.element = document.body.querySelector('.overlay-gallery');
    // блок с номером фото
    this._pictureElement = this.element.querySelector('.overlay-gallery-preview');
    // кнопки
    this._closeButtton = this.element.querySelector('.overlay-gallery-close');
    this._leftButton = this.element.querySelector('.overlay-gallery-control-left');
    this._rightButton = this.element.querySelector('.overlay-gallery-control-right');

    this._currentPhoto = 0;
    this._photos = [];
    // привязывалка

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onLeftButtonClick = this._onLeftButtonClick.bind(this);
    this._onRightButtonClick = this._onRightButtonClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  };

  /**
   * Этератор массива на обьекте (коллекции) с контекстом(1 аргумент) через функцию из протопипа
   * Записывает список фотографий. и их срц
   * @param {Array.<string>} photos
   */

  Gallery.prototype.setPhotos = function(photos) {
    var images = document.querySelectorAll('.photogallery-image');
    var imageUrls = [];
    for (var i = 0; i < images.length; i++) {
      var videoData = images[i].dataset;
      var imagesNodes = images[i].querySelector('.photogallery-image img');

      if (videoData['replacementVideo']) {
        imageUrls.push({
          url: videoData['replacementVideo'],
          preview: imagesNodes.src
        });
      } else {
        imageUrls.push({
          url: imagesNodes.src
        });
      }
    }


    this._photos.reset(photos(function(photo) {
      return new Backbone.Model({
        url: photos.url,
        preview: photos.preview
      });
    }));
  };

  /**
   * Показывает фотогалерею, убирая у контейнера класс invisible. Затем добавляет
   * обработчики событий и показывает текущую фотографию.
   * @param {Image} img
   */
  Gallery.prototype.showGallery = function(img) {
    this.element.classList.remove('invisible');
    this._invisible = false;
    this._closeButtton.addEventListener('click', this._onCloseClick);
    this._leftButton.addEventListener('click', this._onLeftButtonClick);
    this._rightButton.addEventListener('click', this._onRightButtonClick);
    document.body.addEventListener('keydown', this._onKeyDown);

    this.showPhoto(img);
  };

  /**
   * ловит img и показывает его через номер по индексу.
   * @param {Image} img
   */
  Gallery.prototype.showPhoto = function(img) {
    this.element.classList.remove('invisible');
    this._invisible = false;
    var index = this._photos.indexOf(img.getAttribute('src'));
    if (index !== -1) {
      this._currentPhoto = index;
    }

    this._showCurrentPhoto();
  };
  /**
   * доб у оверлея класс invisible и обнуляет текущую фотографию.
   */
  Gallery.prototype.hideGallery = function() {
    this.element.classList.add('invisible');
    this._invisible = true;

    this._currentPhoto = 0;
  };

  /**
   * Приватный метод, показывающий текущую фотографию. Убирает предыдущюю
   * отрисованную фотографию, создает объект Image с src указанным
   * в массиве photos_ под индексом currentPhoto_ и после загрузки показывает
   * его на странице.
   * @private
   */
  Gallery.prototype._showCurrentPhoto = function() {
    this._pictureElement.innerHTML = '';

    var imageElement = new GalleryPicture({ model: this._photos.at(this._currentPhoto) });
    imageElement.render();
    this._pictureElement.appendChild(imageElement.el);
  };

  /**
   * Обработчик события клика по крестику закрытия. Вызывает метод hide.
   * @param {Event} evt
   * @private
   */
  Gallery.prototype._onCloseClick = function(evt) {
    evt.preventDefault();
    this.hideGallery();
  };

  /**
   * Обработчик события клика по стрелке влево.
   * @param {Event} evt
   * @private
   */
  Gallery.prototype._onLeftButtonClick = function(evt) {
    evt.preventDefault();
    this.setCurrentPhoto(this._currentPhoto - 1);
  };

  /**
   * Обработчик события клика по стрелке вправо.
   * @param {Event} evt
   * @private
   */
  Gallery.prototype._onRightButtonClick = function(evt) {
    evt.preventDefault();
    this.setCurrentPhoto(this._currentPhoto + 1);
  };

  /**
   * Обработчик клавиатурных событий. Прячет галерею при нажатии Esc
   * и переключает фотографии при нажатии на стрелки.
   * @param {Event} evt
   * @private
   */
  Gallery.prototype._onKeyDown = function(evt) {
    switch (evt.keyCode) {
      case Key.ESC:
        this.hideGallery();
        break;

      case Key.LEFT:
        this.setCurrentPhoto(this._currentPhoto - 1);
        break;

      case Key.RIGHT:
        this.setCurrentPhoto(this._currentPhoto + 1);
        break;
    }
  };

    /**
     * прокрутка по кругу
     * @param {number} index
     */
  Gallery.prototype.setCurrentPhoto = function(index) {
    if (index < 0) {
      index = 5;
    }

    if (index > 5) {
      index = 0;
    }

    if (this._currentPhoto === index) {
      return;
    }

    var previewNumberContainer = this._pictureElement.children[0].cloneNode(true);
    var numberCurrent = previewNumberContainer.querySelector('.preview-number-current');
    var numberTotal = previewNumberContainer.querySelector('.preview-number-total');

    this._currentPhoto = index;
    this._showCurrentPhoto();

    var imageArray = this._photos.at(this._currentPhoto);
    var imageElement;

    if (imageArray.get('preview')) {
      imageElement = new VideoView({
        model: imageArray
      });
    } else {
      imageElement = new GalleryPicture({
        model: imageArray
      });
    };


    imageElement.render();
    this._pictureElement.appendChild(previewNumberContainer);
    this._pictureElement.appendChild(imageElement.el);

    };

  /**
   * Здесь все обрабочики(а не во внешних модулях)
   * незнаю что делает event.stopPropagation();
   * а так, если нет галлереи — то создаем, устанавливаем фото, и покажываем щелкнутую
   * если есть — просто меняем фото
   * @param {event} event
   */
  var galleryInstance;

  document.querySelector('.photogallery').addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!galleryInstance) {
      galleryInstance = new Gallery();
      // galleryInstance.setPhotos(view.model.get('pictures'));
      galleryInstance.setPhotos();
      galleryInstance.showGallery(event.target);
    } else {
      galleryInstance.showPhoto(event.target);
    }
  });


  window.Gallery = Gallery;

})();
