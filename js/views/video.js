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
    tagName: 'img',

    render: function() {
      this.document.createElement('video') = this.model.get('url');
      this.controls = false;
      this.loop = true;
      this.poster = this.model.get('url');
      this.preview = this.model.get('url');
    }
  });

    window.GalleryVideo = GalleryVideo;
})();
