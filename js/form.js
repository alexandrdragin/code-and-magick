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

//нашел форму через DOM и пытаюсь ее вытащить целиком неуверен что работает
  var allForm = document.querySelector('form .overlay review-form');
  console.log(allForm);

// пытаюсь вытащить текст из форм (неработает)
//  input = document.body.querySelector('[type="text"]'),

//значения по умолчанию
var reviewName = document.getElementById("review-name");
var sReview = document.getElementById("review-text");

//немогу получить значение радио... потому что их там 5?
//var radioVal = document.getElementByClass("review-mark").value;


reviewName.value = " ";
sReview.value = "ждем с нетерпением";

// написал проверку отправки формы но незнаю как ее прикрутить
//<button class="review-form-control review-submit" type="submut">Добавить отзыв</button>

function check(form) {
  var reviewName = reviewName.value;
  var sReview = sReview.value;
  if (reviewName.length < 3)
     bad += "Имя слишком короткое" + "\n";
  if (reviewName.length > 32)
    bad += "Имя слишком длинное" + "\n";
  if (sReview.length < 3)
    bad += "Напишите побольше пожалуйста" + "\n";
  if (sReview.length > 52)
    bad += "Напишите поменше пожалуйста" + "\n";

  if (sReview.length === 0 || sReview === "ждем с нетерпением")
    bad += "Вы забыли написать что хотели" + "\n";
  if (reviewName.length === 0 || reviewName === "можно без фамилии") {
    bad = "имя забыли" + "\n" + bad;
    alert(bad);
    return false;
  }
  return true;
}

//  formElement.onsubmit = function(e) {
//              e.preventDefault();

//  formElement.submit();
//  };

// сегодняшняя дата

var now = new Date();
var exDate = new Date(now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000));

  console.dir(exDate.toUTCString());

//document.cookie = radioVal + date.toUTCString();
document.cookie = reviewName.value + exDate.toUTCString();

//записывает не значение а name=reviewName;?????почему не пробел пустой

/*


валидация будет проходить по onchange,
но что проверять если в отзыве данные могут быть любого типа?
просто чтоб пустые не отровлялись?
if (input.value == null) alert?
//if (reviewName != null)

*/



/// работащщий код для теста(забивает в форму озыва содержание текта по клику)

var reviewName = document.getElementById("review-name")
var checkReviewName = function(){
   var sName = document.getElementById("review-name").value;
   sReview.value += sName;
  };

  reviewName.addEventListener("click", checkReviewName);

//reviewName.addEventListener("onchange", checkReviewName);
/*

синтаксис не знаю вообщем как вытащить радио и в куки записать какой из них чекнутый

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
