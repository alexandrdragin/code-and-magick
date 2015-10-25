/**
 * Опишите в нем модель отзыва, которая будет наследником Backbone.Model.
 */

'use strict';

(function() {
   /** расширение модели бэкбона с лайками
    * @constructor
    * @extends {Backbone.Model}
    */
  var ReviewModel = Backbone.Model.extend({
     /** @override */
    initialize: function() {
      this.set('clicked', false);
       //  return this.['review-rating'];
    },

    like: function() {
      this.set(
       // this.['review-rating'] + 1
      );
    },

    dislike: function() {
      this.set(
      //  this.['review-rating'] - 1
      );
    }
  });

  window.ReviewModel = ReviewModel;
})();
