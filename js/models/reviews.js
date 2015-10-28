/* global Backbone: true ReviewModel: true  */

'use strict';

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
})();
