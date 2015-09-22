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
  var reviewForm = document.querySelector('.review-form');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');

  //значения по умолчанию
  // reviewName = docCookies.getItem('reviewNameCook');
  // radioVal = docCookies.getItem('radioValCook');

  function setCookieFun(name, value, expires) {
    document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "");
  }

  function validateForm() {
    var reviewNameValue = reviewName.value;
    var reviewTextValue = reviewText.value;
    var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;
    var bad = [];
    if (reviewNameValue.length < 3) {
      bad.push('Имя слишком короткое');
    }
    if (reviewNameValue.length > 32) {
      bad.push('Имя слишком длинное');
    }
    if (reviewTextValue.length < 3) {
      bad.push('Напишите побольше пожалуйста');
    }
    if (reviewTextValue.length > 52) {
      bad.push('Напишите поменьше пожалуйста');
    }
    if (reviewTextValue.length === 0 || reviewTextValue === " ") {
      bad.push('Вы забыли написать что хотели');
    }
    if (reviewNameValue.length === 0 || reviewNameValue === " ") {
      bad.push('имя забыли');
      alert(bad.join('\n'));
    }

    return !bad.length
  }

  // написал проверку отправки формы но незнаю как ее прикрутить
  reviewForm.onsubmit = function(e) {
    e.preventDefault();
    var now = new Date();
    var exDate = new Date(now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000));
    var currentScore = reviewForm.querySelector('input[name="review-mark"]:checked').value;
    var currentName = reviewName.value;
    setCookieFun('radioValCook', currentScore, 'exDate.toUTCString()');
    setCookieFun('reviewNameCook', currentName, 'exDate.toUTCString()');
    var isValid = validateForm();
    if (isValid) {
      formContainer.classList.add('invisible');
    }
  }

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
