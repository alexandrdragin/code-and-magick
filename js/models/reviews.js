/*
Создайте модуль js/models/reviews.js.
Опишите в нем коллекцию для работы с отзывами, которая будет наследником Backbone.Collection.
Переопределите у коллекции параметр url,
указав адрес, с которого вы будете загружать данные и параметр model,
сделав его ссылкой на модель отзыва.
*/

/* global Backbone: true ReviewModel: true  */

'use strict';

/**
 * Вызов анонимной функции
 */
(function() {
  /**
   * @constructor
   * @param {Object} attributess
   * @param {Object} options
   */
  var ReviewsCollection = Backbone.Collection.extend({
    model: ReviewModel,
    url: 'data/reviews.json'
  });

  window.ReviewsCollection = ReviewsCollection;
});
