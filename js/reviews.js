'use strict';

//  вызов ананимной функции
(function() {

//  Прячет блок с фильтрами .reviews-filter, добавляя ему класс invisible.
  var reviewForm = document.querySelector('.reviews-filter');
  reviewForm.classList.add('invisible');

//  предустановка редистейтов для xml
  var ReadyState = {
    'UNSEND': 0,
    'OPEN': 1,
    'HEADERS_RECEIVED': 2,
    'LOADING': 3,
    'DONE': 4
  };

//  мап для раздвижки звезд по css
  var ratingClass = {
    '1': 'review-rating-one',
    '2': 'review-rating-two',
    '3': 'review-rating-three',
    '4': 'review-rating-four',
    '5': 'review-rating-five'
  };

  //  константа таймаута
  var requestFailureTimeout = 10000;


//  контейнер для вставки данных
  var reviewContainer = document.querySelector('.reviews-list');
  //  шаблон для загрузки
  var reviewTemplate = document.getElementById('review-template');
  //  фрагмент для ускорения загрузки
  var reviewsFragment = document.createDocumentFragment();

  var reviews;

  reviewForm.classList.remove('invisible');

  function loadingReviews(reviews) {
    reviewForm.classList.remove('invisible');

//    массив для иттерации
    reviews.forEach(function(review, i) {

    //  клонирование шаблона на каждой иттерации
      var newReviewData = reviewTemplate.content.children[0].cloneNode(true);
      newReviewData.querySelector('.review-rating').classList.add(ratingClass[review['rating']]);
      newReviewData.querySelector('.review-text').textContent = review['description'];
      newReviewData.querySelector('.review-author').title = review['author']['name'];

      var authorImages = newReviewData.querySelector('.review-author');
      var tempImages = new Image();
      tempImages.onload = function() {
        authorImages.src = review['author']['picture'];
        authorImages.width = 124;
        authorImages.height = 124;
      };

      tempImages.onerror = function() {
        authorImages.remove();
      };

      tempImages.src = review['author']['picture'];

  //    загрузка во фрагмент
      reviewsFragment.appendChild(newReviewData);
    });

//  загрузка фрагметна
    reviewContainer.appendChild(reviewsFragment);
  }

//  в случаее таймаута
  function showLoadFailure() {
    reviewContainer.classList.add('review-load-failure');
  }

//  функция загрузки по xhr
  function loadXHR(callback) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = requestFailureTimeout;
    xhr.open('get', 'data/reviews.json');
    xhr.send();

    //  обработчик изменений состояний
    xhr.onreadystatechange = function(evt) {
      var loadedXhr = evt.target;

      switch (loadedXhr.readyState) {
        case ReadyState.OPENED:
        case ReadyState.HEADERS_RECEIVED:
        case ReadyState.LOADING:
          reviewContainer.classList.add('reviews-list-loading');
          break;

        case ReadyState.DONE:
        default:
          if (loadedXhr.status === 200 || loadedXhr.status === 304) {
            var data = loadedXhr.response;
            reviewContainer.classList.remove('reviews-list-loading');
            // console.log(data);
        //  хелпер переводящий в формат джейсона
            callback(JSON.parse(data));
          }

          if (loadedXhr.status > 400) {
            showLoadFailure();
          }
          break;
      }
    };
// обработчик таймаута и ошибки
    xhr.ontimeout = function() {
      showLoadFailure();
    };
    xhr.onerror = function() {
      showLoadFailure();
    };

//  закрытие функции загрузки по xhr
  }

  //  >>>Обработчик ошибки: добавьте блоку отзыва .review класс review-load-failure.
  reviewContainer.onerror = function() {
    reviewContainer.classList.add('review-load-failure');
  };

// когда загрузилось эта функция принимает data, сохраняет и отрисовывает их
  loadXHR(function(loadedReviews) {
    reviews = loadedReviews;
  //  loadingReviews = (loadedReviews);
  });

})();
