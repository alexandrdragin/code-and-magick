//http://212.myftp.org:8080/
//виртуальный сервер

/* задание
напишите валидацию формы отзыва, которая показывается в оверлее.
Нужно сделать валидацию обязательных текстовых полей и показывать снизу
список полей, значения которых нужно заполнить. В случае, если форма валидна,
 убирать блок со списком полей. В cookies сохранить оценку и имя пользователя.

NB! Всем cookies со значениями полей нужно указать срок жизни: сегодняшняя дата
 + количество дней, прошедших с вашего дня рождения (можно посчитать
с помощью еще одного объекта Date).
*/

(function() {

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

//нашел форму через DOM и пытаюсь ее вытащить целиком
  var allForm = document.querySelector('form .overlay review-form');
  console.log(allForm);

// пытаюсь вытащить текст из форм (неработает)
//  input = document.body.querySelector('[type="text"]'),


// сегодняшняя дата

  var now = new Date();
  var cookiesLifeTime = now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000);

  console.dir(cookiesLifeTime);

//вернуть в другой формат

/*
это(наверно) значение которые я нашел в DOMе и по заданию


  <input type="text" name="review-name" id="review-name" class="review-form-field review-form-field-name">
и
  <textarea name="review-text" id="review-text" class="review-form-field review-form-field-text" cols="32" rows="8"></textarea>

но я не знаю как именно к ним обратиться

валидация будет проходить по onchange,
но что проверять если в отзыве данные могут быть любого типа?
просто чтоб пустые не отровлялись?
if (input.value == null) alert?

*/

//коллбек по изменениию

//if (reviewName != null)

/// работащщий код для проверки имен(забивает в форму озыва текст по клику)
var reviewName = document.getElementById("review-name")
var checkReviewName = function(){
   document.getElementById("review-text").textContent += "checkReviewName!";
  };

  reviewName.addEventListener("click", checkReviewName);
//reviewName.addEventListener("onchange", checkReviewName);
/*

if ( reviewName != null && review-text != null) send form?????
else not send


это просто галка котороую в куки записать

docCookies.setItem(?review-mark ?value; expires = cookiesLifeTime.toGMTString(););


синтаксис не знаю вообщем как вытащить

  <span class="review-form-label">Оценка<br>
         <input type="radio" name="review-mark" id="review-mark-5" value="5"><label class="review-mark-label review-mark-label-5" for="review-mark-5">1</label>
         <input type="radio" name="review-mark" id="review-mark-4" value="4"><label class="review-mark-label review-mark-label-4" for="review-mark-4">2</label>
         <input type="radio" name="review-mark" id="review-mark-3" value="3" checked=""><label class="review-mark-label review-mark-label-3" for="review-mark-3">3</label>
         <input type="radio" name="review-mark" id="review-mark-2" value="2"><label class="review-mark-label review-mark-label-2" for="review-mark-2">4</label>
         <input type="radio" name="review-mark" id="review-mark-1" value="1"><label class="review-mark-label review-mark-label-1" for="review-mark-1">5</label>
       </span>

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
