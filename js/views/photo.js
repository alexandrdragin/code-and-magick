/*
Создайте модуль js/views/photo.js, который будет описывать представление фотографии в галерее.
Перепишите модуль js/gallery.js таким образом,
чтобы фотографии отображались отрисовкой представления js/views/photo.js.
*/

'use strict';

(function() {
  var GalleryPicture = Backbone.View.extend({
    tagName: 'img',

    render: function() {
      this.el.src = this.model.get('url');
    }
  });

    window.GalleryPicture = GalleryPicture;
})();
