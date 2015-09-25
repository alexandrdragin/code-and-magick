/*Задача

Напишите модуль инициализации списка отзывов, который:

Прячет блок с фильтрами .reviews-filter, добавляя ему класс invisible.

Cоздаёт для каждой записи массива reviews блок отзыва на основе шаблона #review-template. Шаблон находится в index.html.

Выводит созданные элементы на страницу внуть блока .reviews-list, используя DocumentFragment.

Все изображения создаёт с помощью new Image() и добавляет им обработчики загрузки и ошибки

Обработчик загрузки: после загрузки изображения замените им изображение, находящееся в шаблоне с помощью Element.replaceChild и укажите размеры 124×124.

Обработчик ошибки: добавьте блоку отзыва .review класс review-load-failure.

Отображает блок с фильтрами.*/



var reviewsTitle = document.querySelectorAll("h2 .section-title reviews-title")

var hide = function(){
  reviewsTitle.style.display = "none";

//?????
};
//hide();


// почему этоти методы не работает????
var reviewsFilter = document.getElementsByClassName('reviews-filter');
reviewsFilter.className += "invisible";
//reviewsFilter.classList.add("invisible");








var reviewForm = document.querySelector('.reviews-filter');
reviewForm.className = "invisible";
//reviewForm.classList.add("invisible");



var ratingClass = {
'1': 'review-rating-one',
'2': 'review-rating-two',
'3': 'review-rating-three',
'4': 'review-rating-four',
'5': 'review-rating-five',
};


var reviewContainer = document.querySelector('.reviews-list')
var reviewTemplate = document.getElementById('review-template')

var reviewsFragment = document.createDocumentFragment();

reviews.forEach(function(review, i){
  var newReviewDot = reviewTemplate.content.children[0].cloneNode(true);

newReviewDot.querySelector('.review-author').textContent = review['name'];
newReviewDot.querySelector('.review-rating').classList.add(ratingClass[reviews['rating']]);
newReviewDot.querySelector('.review-text').textContent = review['description'];

/*
review['author'].forEach(function(author, i){
var authorElement = document.createElement('div');
authorElement.textContent = author['name'];
authorElement.className = "picture";

authorContainer.appendChild(authorElement);
});
*/



reviewsFragment.appendChild(newReviewDot);

if (reviews['picture']) {
  var reviewBackground = new Image();
  reviewBackground.src = reviews['picture'];
}

/*
      reviewBackground.onload = function() {
        newReviewDot.style.backgroundImage = 'url(\'' + reviewBackground.src + '\')';
        newReviewDot.style.height = "125";
        reviewBackground.replaceChild;
      }

      reviewBackground.onerror = function(evt) {
        newReviewDot.classList.add('review-load-failure');
      };
*/


});

reviewContainer.appendChild(reviewsFragment);








reviewForm.className.remove = "invisible";





/*
<template id="review-template">
  <article class="review">
    <img src="" class="review-author" alt="" title="" />
    <span class="review-rating"></span>
    <p class="review-text"></p>
    <div class="review-quiz">
      Полезный отзыв?
      <span class="review-quiz-answer">Да</span>
      <span class="review-quiz-answer">Нет</span>
    </div>
  </article>
</template>
*/
