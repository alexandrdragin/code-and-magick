var reviewsTitle = document.querySelectorAll("h2 .section-title reviews-title")
console.log(reviewsTitle);
reviewsTitle.innerHTML = "покажись"
console.log(reviewsTitle);

var hide = function(){
  reviewsTitle.style.display = "none";

//?????
};
hide();





var reviewsFilter = document.getElementsByClassName('reviews-filter');

reviewsFilter.className = "hidden";
console.log(reviewsFilter);
