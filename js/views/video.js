/*
Добавьте модуль js/views/video.js, который наследует тип Backbone.View,
который будет отрисовывать видео как слайд галереи.
Видео должно создаваться в методе render с помощью document.createElement('video').
Параметры видео: управляющие элементы должны быть выключены,
проигрывание видео зациклено, остановка и запуск видео осуществляются по клику,
замещающая картинка находится в свойстве preview.

Доработайте модуль js/gallery.js

При создании коллекции фотографий
в свойство url запишите адрес видео,
если оно указано в data-атрибуре соответствующего элемента.
Адрес картинки, в этом случае, запишите в свойство preview.
При отрисовке слайда используйте объект, объявленный в модуле js/views/video.js,
если у элемента есть свойство preview.
*/

'use strict';

(function() {
  var GalleryVideo = Backbone.View.extend({

    initialize: function() {
      this._onClickVideo = this._onClickVideo.bind(this);
    },

    events: {
      'click': '_onClickVideo'
    },

    render: function() {
      var videoElement = document.createElement('video');
      videoElement.src = this.model.get('url');
      videoElement.autoplay = true;
      videoElement.poster = this.model.get('preview');
      videoElement.loop = true;
      videoElement.controls = false;
      videoElement.addEventListener('click', this._onClickVideo);
      this.el = videoElement;
    },

    _onClickVideo: function(evt) {
      if (evt.target === this.el) {
        if (this.el.paused) {
          this.el.play();
        } else {
          this.el.pause();
        }
      }
    }
  });

  window.GalleryVideo = GalleryVideo;
})();
