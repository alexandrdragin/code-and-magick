/* global Backbone: true  */

'use strict';

define([
  'models/review'
], function(ReviewModel) {
  /**
   * @constructor (разширение бекбона по загрузки данных, имя модели чтоб потом поней обращаться
   * путь и возвращение коллекции в глобальный скоп)
   * @param {Object} attributess
   * @param {Object} options
   */
  var ReviewsCollection = Backbone.Collection.extend({
    model: ReviewModel,
    url: 'data/reviews.json'
  });

  return ReviewsCollection;
});
