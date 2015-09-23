(function() {


var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = document.querySelector('.review-form-close');



var reviewForm = document.querySelector('.review-form');
var reviewName = document.getElementById('review-name');
var reviewText = document.getElementById('review-text');
var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;


reviewName.required = true;
reviewText.required = true;


if (reviewName.length > 1) {
  var reviewFieldsName = document.getElementsByClassName('review-fields-label review-fields-name');
  reviewFieldsName.style.display = "display";
};

if (reviewText.length > 1) {
var reviewFieldsText = document.getElementsByClassName('review-fields-label review-fields-text');
reviewFieldsText.style.display = "none";
};



function setCookieFun (name, value, expires) {
document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "");
};

reviewScoreValue.value = docCookies.getItem('radioValCook');
reviewName.value = docCookies.getItem('reviewNameCook');




reviewForm.onsubmit = function(e) {
e.preventDefault();
var now = new Date();
var exDate = new Date(now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000));

var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;
var currentName = reviewName.value;

    setCookieFun('radioValCook', reviewScoreValue.value, 'exDate.toUTCString()');
    setCookieFun('reviewNameCook', currentName, 'exDate.toUTCString()');


    reviewForm.submit();
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
