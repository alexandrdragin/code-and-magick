'use strict';

//  вызов анонимной функции
(function() {

  /**
   *  Поиск и загрузка облаков, установка видимости и времени
   * @type {Element}, {true}, {null},
   */
  var headerClouds = document.querySelector('.header-clouds');
  var isWeSeeClouds = true;
  var checkTime = null;

  function isWeSeeClouds400() {
    return window.pageYOffset < 400;
  }

  function moveClouds() {
    if (isWeSeeClouds) {
      var num = window.pageYOffset;
      headerClouds.style.top = num / 4 + 0 + 'px';
      headerClouds.style.backgroundPosition = num / 2 + 0 + 'px';
    }
  }

  function checkVisbility() {
    if (isWeSeeClouds400()) {
      isWeSeeClouds = true;
    } else {
      window.dispatchEvent(new CustomEvent('disappear'));
    }
  }

  function initScroll() {
    window.addEventListener('scroll', function() {
      moveClouds();

      if (checkTime) {
        return false;
      }
      checkTime = setTimeout(function() {
        checkVisbility();
        checkTime = null;
      }, 100);
    });

    window.addEventListener('disappear', function() {
      isWeSeeClouds = false;
    });
  }

  initScroll();

})();
