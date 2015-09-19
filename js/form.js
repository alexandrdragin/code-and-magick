//http://95.30.41.226:8080/
//виртуальный сервер


(function() {


  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

//обращение к форме
  var allForm = document.querySelector('form .overlay review-form');
  console.log(allForm);

/* задание
напишите валидацию формы отзыва, которая показывается в оверлее.
Нужно сделать валидацию обязательных текстовых полей и показывать снизу
список полей, значения которых нужно заполнить. В случае, если форма валидна,
 убирать блок со списком полей. В cookies сохранить оценку и имя пользователя.

NB! Всем cookies со значениями полей нужно указать срок жизни: сегодняшняя дата
 + количество дней, прошедших с вашего дня рождения (можно посчитать
с помощью еще одного объекта Date).
*/

// сегодняшняя дата
  var MILLISECONDS_IN_DAY = 60 * 60 * 24 * 1000;
  var now = new Date();
  var cookiesLifeTime = now + (30 * 365 * MILLISECONDS_IN_DAY);

  var lifeTime = new Date (30 * 365 * MILLISECONDS_IN_DAY );
  var stringTime = lifeTime.toGMTString();


  console.dir(lifeTime);
  console.log(stringTime);
  console.dir(cookiesLifeTime);


//неработает, хотя я думал что даты храняться в милисекундах
//вернуть в другой формат

/*
это(наверно) значение которые я нашел в DOMе и их нужно посохранить в куки до отправки

но я не знаю как именно к ним обратиться
и какие значения из сохранять
по событиям он onchange в формах?


 <span class="review-form-label">Оценка<br>
        <input type="radio" name="review-mark" id="review-mark-5" value="5"><label class="review-mark-label review-mark-label-5" for="review-mark-5">1</label>
        <input type="radio" name="review-mark" id="review-mark-4" value="4"><label class="review-mark-label review-mark-label-4" for="review-mark-4">2</label>
        <input type="radio" name="review-mark" id="review-mark-3" value="3" checked=""><label class="review-mark-label review-mark-label-3" for="review-mark-3">3</label>
        <input type="radio" name="review-mark" id="review-mark-2" value="2"><label class="review-mark-label review-mark-label-2" for="review-mark-2">4</label>
        <input type="radio" name="review-mark" id="review-mark-1" value="1"><label class="review-mark-label review-mark-label-1" for="review-mark-1">5</label>
      </span>

      */


/*
это значение которым нужно установить валидацию

  <input type="text" name="review-name" id="review-name" class="review-form-field review-form-field-name">
и
  <textarea name="review-text" id="review-text" class="review-form-field review-form-field-text" cols="32" rows="8"></textarea>

*/



//появление формы
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

// скрытие формы
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };



})();
