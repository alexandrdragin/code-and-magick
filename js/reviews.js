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

  // правила сортировки
  function filterReviews(reviews, filterID) {
    // копирование изначального списка отелей
    var filteredReviews = reviews.slice(0);
    switch (filterID) {
      case 'reviews-recent':
        filteredReviews = filteredReviews.sort(function(a, b){
          //вообщем дата вот в таком формате 2013-12-03 не очень понимаю к чему ее привести нужно чтобы сравнивать
          if (a.date > b.date || (b.date && a.date === underfined)) {
            return -1;
          }

          if (a.date < b.date || (b.date && a.date === underfined)){
            return 1;
          }

          if (a.date === b.date){
            return 0;
          }
        });

        break;

      case 'reviews-good':
      filteredReviews = filteredReviews.sort(function(a, b){
        if (a.rating > b.rating || (b.rating && a.rating === underfined)) {
          return -1;
        }

        if (a.rating < b.rating || (b.rating && a.rating === underfined)){
          return 1;
        }

        if (a.rating === b.rating){
          return 0;
        }
      });

      break;

      case 'reviews-bad':
      filteredReviews = filteredReviews.sort(function(a, b){
        if (a.rating > b.rating || (b.rating && a.rating === underfined)) {
          return 1;
        }

        if (a.rating < b.rating || (b.rating && a.rating === underfined)){
          return -1;
        }

        if (a.rating === b.rating){
          return 0;
        }
      });

      break;

      case 'reviews-popular':

      filteredReviews = filteredReviews.sort(function(a, b){
        if (a.review-rating > b.review-rating || (b.review-rating && a.review-rating === underfined)) {
          return 1;
        }

        if (a.review-rating < b.review-rating || (b.review-rating && a.review-rating === underfined)){
          return -1;
        }

        if (a.review-rating === b.review-rating){
          return 0;
        }
      });

      break;

      default:
        filteredReviews = reviews.slice(0);
        break;
    }
    return filteredReviews;
  }

// функция включения фильтров(находит по классу)
  function startFilters() {
    var filterElements = document.querySelectorAll('.reviews-filter-item');
    for (var i = 0, l = filterElements.length; i < l; i++) {

      // добовлям обработчик события которая запускает сетАктивФильтер
      filterElements[i].onclick = function(evt) {
        var clickedFilter = evt.currentTarget;
        setActiveFilter(clickedFilter.id);
        // и чекед переставляет местами
        document.querySelector('.reviews-filter-item.checked').setAttribute('checked', false);
        document.querySelector('input[name="reviews"]').setAttribute('checked', false);
        move('.reviews-filter-item.checked');
        clickedFilter.setAttribute('checked', true);
      }
    }
  }

  //функция включающая сортировку берет список ревью фильтурет по правилам
  function setActifveFilter(filterID) {
    var filteredReviews = filterReviews(reviews, filterID)
    //возвращаем и отрисовываем
    loadingReviews(filteredReviews);
  }

  startFilters();

  loadingReviews(function(loadedReviews){
    reviews = loadedReviews;
    setActifveFilter('reviews-all');
  });

// когда загрузилось эта функция принимает data, сохраняет и отрисовывает их
// loadingReviews();
  loadXHR(function(loadedReviews) {
    reviews = loadedReviews;
  //  loadingReviews = (loadedReviews);
  });

})();

/*
<form class="reviews-filter" action="index.html" method="get">
  <input type="radio" name="reviews" id="reviews-all" value="reviews-all" checked><label for="reviews-all" class="reviews-filter-item"> Все</label>
  <input type="radio" name="reviews" id="reviews-recent" value="reviews-recent"><label for="reviews-recent" class="reviews-filter-item"> Недавние</label>
  <input type="radio" name="reviews" id="reviews-good" value="reviews-good"><label for="reviews-good" class="reviews-filter-item"> Хорошие</label>
  <input type="radio" name="reviews" id="reviews-bad" value="reviews-bad"><label for="reviews-bad" class="reviews-filter-item"> Плохие</label>
  <input type="radio" name="reviews" id="reviews-popular" value="reviews-popular"><label for="reviews-popular" class="reviews-filter-item"> Популярные</label>


/*
Доработайте модуль js/reviews.js:
+Отключите загрузку данных из файла data/reviews.js убрав подключение этого скрипта из index.html.
+Загрузите данные из файла data/reviews.json по XMLHttpRequest.
+Пока длится загрузка файла, покажите прелоадер, добавив класс .reviews-list-loading блоку .reviews.
+Когда загрузка закончится, уберите прелоадер и покажите список отзывов, как в предыдущем задании.
+Если загрузка закончится неудачно (ошибкой сервера или таймаутом), покажите предупреждение об ошибке, добавив блоку .reviews класс reviews-load-failure.

Напишите обработчики событий для фильтров, так, чтобы они фильтровали загруженный список отзывов следующим образом:
  Все — показывает список отзывов в таком виде, в котором он был загружен.
  Недавние — показывает список отзывов, оставленных за последние полгода, отсортированных по убыванию даты (поле date).
  Хорошие — с рейтингом не ниже 3, отсортированные по убыванию рейтинга (поле rating).
  Плохие — с рейтингом не выше 2, отсортированные по возрастанию рейтинга.
  Популярные — отсортированные по убыванию оценки отзыва (поле reviewRating).
*/
