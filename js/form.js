(function() {


var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = document.querySelector('.review-form-close');


var reviewForm = document.querySelector('.review-form');
var reviewName = document.getElementById('review-name');
var reviewText = document.getElementById('review-text');

var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;


function setCookieFun (name, value, expires) {
document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "");
};

reviewScoreValue.value = docCookies.getItem('radioValCook');
reviewName.value = docCookies.getItem('reviewNameCook');


function validateForm() {
var bad = [];
if (reviewName.length < 3) {
    bad.push('Имя слишком короткое');
    }
    if (reviewName.length > 32) {
      bad.push('Имя слишком длинное');
    }
    if (reviewText.length < 3) {
    bad.push('Напишите побольше пожалуйста');
    }
    if (reviewText.length > 52) {
      bad.push('Напишите поменьше пожалуйста');
   }
    if (reviewText.length === 0 || reviewText === " ") {
      bad.push('Вы забыли написать что хотели');
    }
    if (reviewName.length === 0 || reviewName === " ") {
      bad.push('имя забыли');
      alert(bad.join('\n'));
    }
    return !bad.length
  }


    reviewForm.onsubmit = function(e) {
      e.preventDefault();
      var now = new Date();
      var exDate = new Date(now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000));

      var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;
      var currentName = reviewName.value;



          setCookieFun('radioValCook', reviewScoreValue.value, 'exDate.toUTCString()');
          setCookieFun('reviewNameCook', currentName, 'exDate.toUTCString()');
          }

          var isValid = validateForm();
          if (isValid) {formContainer.classList.add('invisible');}


      if (reviewName.length > 0) {
        var reviewFieldsName = document.getElementsByClassName('review-fields-name');
        reviewFieldsName.style.visibility = "hidden";
  };


      if (reviewText.length > 0) {
      var reviewFieldsText = document.getElementsByClassName('review-fields-text');
      reviewFieldsText.style.visibility = "hidden";
      };



///


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
