var reviewsTitle = document.querySelectorAll("h2 .section-title reviews-title")
var hide = function(){
  reviewsTitle.style.display = "none";

//?????
};
//hide();




// почему этот метод не работает????
var reviewsFilter = document.getElementsByClassName('reviews-filter');

reviewsFilter.className += "invisible";
//reviewsFilter.classList.add("invisible");
console.log(reviewsFilter);

var reviewForm = document.querySelector('.reviews-filter');

reviewForm.className = "invisible";
//reviewForm.classList.add("invisible");
console.log(reviewForm);
