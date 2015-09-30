'use strict';

//вызов ананимной функции
(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewForm = document.querySelector('.review-form');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');

  reviewName.required = true;
  reviewText.required = true;

  function checkValues() {
    var reviewNameLabel = reviewForm.getElementsByClassName('review-fields-name')[0];
    if (reviewName.value.length) {
      reviewNameLabel.classList.add("invisible");
      } else {
      reviewNameLabel.classList.remove("invisible");
      };

      var reviewFieldsText = reviewForm.getElementsByClassName('review-fields-text')[0];
      if (reviewText.value.length) {
        reviewFieldsText.classList.add("invisible");
        } else {
          reviewFieldsText.classList.remove("invisible");
        };
      };

reviewName.onkeyup = function() {
  checkValues();
  };

reviewText.onkeyup = function() {
  checkValues();
  };


function setCookieFun (name, value, expires) {
  document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "");
  };


reviewName.value = docCookies.getItem('reviewNameCook');

var savedScoreValue = docCookies.getItem('radioValCook');
if (savedScoreValue) {
var selectedRadio = reviewForm.querySelector('input[name="review-mark"][value="' + savedScoreValue +'"]');
selectedRadio.setAttribute('checked', true);
};


reviewForm.onsubmit = function(e) {
  e.preventDefault();
  var now = new Date();
  var exDate = new Date(now.getTime() + (30 * 365 * 60 * 60 * 24 * 1000));

  var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;
  var currentName = reviewName.value;

    setCookieFun('radioValCook', reviewScoreValue, exDate.toUTCString());
    setCookieFun('reviewNameCook', currentName, exDate.toUTCString());


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
