/*Задача

Напишите модуль инициализации списка отзывов, который:

Прячет блок с фильтрами .reviews-filter, добавляя ему класс invisible.

Cоздаёт для каждой записи массива reviews блок отзыва на основе шаблона #review-template. Шаблон находится в index.html.

Выводит созданные элементы на страницу внуть блока .reviews-list, используя DocumentFragment.

Все изображения создаёт с помощью new Image() и добавляет им обработчики загрузки и ошибки

Обработчик загрузки: после загрузки изображения замените им изображение, находящееся в шаблоне с помощью Element.replaceChild и укажите размеры 124×124.
(непонял что нужно)
Обработчик ошибки: добавьте блоку отзыва .review класс review-load-failure.

Отображает блок с фильтрами.*/



// почему этоти методы не работает????
var reviewsFilter = document.getElementsByClassName('.reviews-filter');
reviewsFilter.className += "invisible";
//reviewsFilter.classList.add("invisible");


var reviewForm = document.querySelector('.reviews-filter');
reviewForm.className = "invisible";
//reviewForm.classList.add("invisible");
//reviewForm.style.display = "none";




var reviewList = document.querySelector('.reviews-list');

var ratingClass = {
'1': 'review-rating-one',
'2': 'review-rating-two',
'3': 'review-rating-three',
'4': 'review-rating-four',
'5': 'review-rating-five',
};

//контейнер и шаблон для вставки данных
var reviewContainer = document.querySelector('.reviews-list')
var reviewTemplate = document.getElementById('review-template')

//фрагмент для ускорения загрузки
var reviewsFragment = document.createDocumentFragment();

//массив для иттерации
reviews.forEach(function(review, i){

  //кланирование шаблона на каждой иттерации
  var newReviewData = reviewTemplate.content.children[0].cloneNode(true);


newReviewData.querySelector('.review-rating').classList.add(ratingClass[review['rating']]);
newReviewData.querySelector('.review-text').textContent = review['description'];
newReviewData.querySelector('.review-author').src = review['author']['picture'];
newReviewData.querySelector('.review-author').title = review['author']['name'];

//newReviewData.querySelector('.review-name').textContent = review['author']['name'];

//<img src="" class="review-author" alt="" title="" />


//загрузка во фрагмент
reviewsFragment.appendChild(newReviewData);
});



//reviewList.appendChild(newReviewData);

//Cannot read property 'picture' of undefined
/* обработчик загрузки

if (reviews['author']['picture']) {

  var reviewpicture = new Image();
  reviewpicture.src = review['author']['picture'];




      reviewpicture.onload = function() {
        newReviewData.style.height = "125";
        reviewpicture.replaceChild();
      }

      reviewpicture.onerror = function(evt) {
        newReviewData.classList.add('review-load-failure');
      };


  };


*/





//загрузка фрагметна
reviewContainer.appendChild(reviewsFragment);







//неработает хотя добавил этим методом

reviewForm.className.remove = "invisible";

//работает незнаю почему
//reviewForm.classList.remove('invisible');
