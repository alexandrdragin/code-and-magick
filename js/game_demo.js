'use strict';

//  вызов анонимной функции
(function() {

  var headerClouds = document.querySelector('.header-clouds');
<<<<<<< HEAD

  function isWeSeeClouds() {
    // проверяем элемент относительно вью порта  363  и 290
    // return headerClouds.getBoundingClientRect().top < 200;
    return window.pageYOffset < 500;
=======
  var isWeSeeClouds = true;
  var checkTime = null;

  function isWeSeeClouds400() {
    return window.pageYOffset < 400;
  }

  function moveClouds() {
    if (isWeSeeClouds) {
      var num = window.pageYOffset;
      headerClouds.style.top = num / 2 + 0 + 'px';
      headerClouds.style.backgroundPosition = num / 8 + 0 + 'px';
    }
  }

  function checkVisbility() {
    if (isWeSeeClouds400()) {
      isWeSeeClouds = true;
    } else {
      window.dispatchEvent(new CustomEvent('disappear'));
    }
>>>>>>> master
  }

  function initScroll() {
    window.addEventListener('scroll', function() {
<<<<<<< HEAD
      if (isWeSeeClouds()) {
        var num = window.pageYOffset;
        headerClouds.style.top = num / 2  + 0 + "px";
        headerClouds.style.backgroundPosition = num / 8 + 10 + "px";
      }
    });

    window.addEventListener('disappear', function() {
      window.removeEventListener('scroll');
    });
  }

  function disappear() {
    if (window.pageYOffset > 300) {
      headerClouds.dispatchEvent(new CustomEvent('disappear'));
      console.log('Hi2');
    }
  }

  function checkTime() {
    isWeSeeClouds();
    disappear();
    setTimeout(checkTime, 300);
  }

  initScroll();
  checkTime();

})();

/*
Создайте модуль js/game_demo.js
+ Добавьте обработчик события scroll у объекта window, который будет изменять свойство style.backgroundPosition у блока .header-clouds (эффект параллакса).
  Оптимизируйте обработчик скролла:
+- Если блок .header-clouds находится вне видимости, не производите вычисления background-position. Для определения видимости используйте Element.getBoundingClientRect.
? Оптимизируйте обработчик события scroll с помощью таймаута, который срабатывает каждые 100 миллисекунд и испускает кастомное событие «исчезновения блока с облаками» из поля зрения.
! Смещение для параллакса должно пересчитываться не каждые 100 миллисекунд, а на каждое изменение скролла, оптимизация касается только проверки видимости блока с облаками.
  Добавьте обработчик события, отключающий параллакс, реагирующий на событие «исчезновения блока с облаками» из поля зрения.
+ Пример того, как могут вести себя облака при прокрутке. Вы можете использовать любую функцию для изменения позиции фона при скролле, главное, чтобы облака двигались.
*/
=======
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
>>>>>>> master
