'use strict'

// import * as allFunctions from './module/sum.js';

// =================== Spoilers ===================
// import componentSpoilers from '../components/Spoiler/spoiler.js';


// ======================[ Scroll Animation ]======================
function scrollAnimation() {
   function onEntry(entries, observer) {
      entries.forEach(entry => {
         const target = entry.target;

         if (entry.isIntersecting) {
            target.classList.add('_active');

            if (target.hasAttribute('data-watch-once')) {
               observer.unobserve(target);
            }
         } else {
            if (!target.hasAttribute('data-watch-once')) {
               target.classList.remove('_active');
            }
         }
      });
   }

   const defaultThreshold = 0.25;
   const watchElements = document.querySelectorAll('[data-watch]');

   watchElements.forEach(element => {
      let threshold = parseFloat(element.getAttribute('data-watch-threshold'));
      if (isNaN(threshold)) {
         threshold = defaultThreshold;
      }

      const options = {
         threshold: threshold
      };

      const observer = new IntersectionObserver(onEntry, options);
      observer.observe(element);
   });
}
scrollAnimation()

//  ======================[ Header ]======================

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   IOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|IPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.IOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};

// ============ Burger menu ============
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener('click', function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}

window.onload = function () {
   document.addEventListener('click', documentActions);

   function documentActions(e) {
      const targetElement = e.target;

      if (window.innerWidth > 768 && isMobile.any()) {
         if (targetElement.classList.contains('menu__arrow')) {
            targetElement.closest('.menu__item').classList.toggle('_hover');
         }
         if (targetElement.classList.contains('menu__sub-arrow')) {
            // if you need automatic list close, when open another list
            Array.from(document.querySelectorAll('.menu__sub-item._hover')).forEach(elem => {
               elem.classList.remove('_hover');
            })

            targetElement.closest('.menu__sub-item').classList.toggle('_hover');
         }
         if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            const menuHoverItems = Array.from(document.querySelectorAll('.menu__item._hover'));
            menuHoverItems.forEach(item => {
               item.classList.remove('_hover');
            });
         }
      }
   }

}

const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
   if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
   } else {
      headerElement.classList.add('_scroll');
   }
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);


const currentPage = window.location.pathname;

function linkActiveRemove() {
   const currentLink = document.querySelector('a._active');
   currentLink.classList.remove('_active');
   return currentLink;
}

if (currentPage === '/gallery.html') {
   linkActiveRemove();
   document.querySelector('a[href="gallery.html"]').classList.add('_active');
} else if (currentPage === '/projects.html' || currentPage === '/project.html') {
   linkActiveRemove();
   document.querySelector('a[href="projects.html"]').classList.add('_active');
} else if (currentPage === '/contacts.html') {
   linkActiveRemove();
   document.querySelector('a[href="contacts.html"]').classList.add('_active');
}

// =================== Spoilers ===================
// componentSpoilers();



new Swiper('.slider-main-slider', {
   observer: true,
   observeParents: true,
   slidesPerView: 1.1,
   spaceBetween: 0,
   watchOverflow: true,
   speed: 800,
   preloadImages: false,
   parallax: true,
   // Arrows
   navigation: {
      nextEl: '.slider-arrow-next',
      prevEl: '.slider-arrow-prev',
   },
   pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      formatFractionCurrent: function (number) {
         return number.toString().padStart(2, '0'); // Форматування поточного номера
      },
      formatFractionTotal: function (number) {
         return number.toString().padStart(2, '0'); // Форматування загального номера
      },
   },
   breakpoints: {
      // when window width is > 320px
      320: {
         slidesPerView: 1.1,
      },
      // when window width is > 768px
      768: {
         slidesPerView: 1,
      },
   }
});

const mySwiper = new Swiper('.slider-images-gallery', {
   // Встановлюємо параметри на основі початкової ширини
   slidesPerView: 5,
   slidesPerGroup: 5,
   grid: {
      rows: 2,
   },
   spaceBetween: 30,
   watchOverflow: true,
   speed: 800,
   preloadImages: false,
   parallax: true,
   navigation: {
      nextEl: '.slider-arrow-next',
      prevEl: '.slider-arrow-prev',
   },
   pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      formatFractionCurrent: function (number) {
         return number.toString().padStart(2, '0');
      },
      formatFractionTotal: function (number) {
         return number.toString().padStart(2, '0');
      },
   },
   breakpoints: {
      // when window width is > 320px
      320: {
         slidesPerView: 1,
         slidesPerGroup: 1,
         grid: {
            rows: 1,
         },
      },
      480: {
         slidesPerView: 2,
         slidesPerGroup: 2,
         grid: {
            rows: 1,
         },
      },
      768: {
         slidesPerView: 3,
         slidesPerGroup: 3,
         grid: {
            rows: 2,
         },
      },
      992: {
         slidesPerView: 4,
         slidesPerGroup: 4,
         grid: {
            rows: 2,
         },
      },
      1200: {
         slidesPerView: 5,
         slidesPerGroup: 5,
         grid: {
            rows: 2,
         },
      }
   },
});

const projectsSwiper = new Swiper('.slider-projects', {
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   spaceBetween: 10,
   watchOverflow: true,
   speed: 800,
   preloadImages: false,
   parallax: true,
   // Arrows
   navigation: {
      nextEl: '.slider-arrow-next',
      prevEl: '.slider-arrow-prev',
   },
   pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      formatFractionCurrent: function (number) {
         return number.toString().padStart(2, '0'); // Форматування поточного номера
      },
      formatFractionTotal: function (number) {
         return number.toString().padStart(2, '0'); // Форматування загального номера
      },
   },
   breakpoints: {
      // when window width is > 320px
      320: {
         slidesPerView: 1,
      },
      // when window width is > 768px
      768: {
         slidesPerView: 1,
      },
   }
})

function checkScreenWidth() {
   if (window.innerWidth < 768) {
      projectsSwiper.disable();
   } else {
      projectsSwiper.enable();
   }
}

window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);
// =================== Form ===================
let formErrorStatus = false;

// Search all inputs with attribute data-required
const inputs = document.querySelectorAll('[data-required]');
const checkbox = document.querySelector('.custom-checkbox');

const validators = {
   phone: /^\+?[0-9]{10,14}$/, // Простий приклад для телефонів (можна налаштувати)
   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Простий приклад для електронної пошти
   text: /.+/, // Не порожній текст
};

if (document.querySelector('[data-check-button]')) {
   document.querySelector('[data-check-button]').addEventListener('click', function () {
      // Перебір всіх інпутів
      inputs.forEach(input => {

         const requiredType = input.dataset.required;
         const previousError = input.parentNode.querySelector('.form__error');

         // Очищення попередніх повідомлень
         if (previousError) {
            previousError.remove();
            input.classList.remove('input_error');

            if (checkbox) {
               checkbox.classList.remove('input_error');
            }
         }

         const value = input.value.trim();

         if (input.dataset.required === 'checkbox') {

            if (!input.checked) {
               input.classList.add('input_error');
               checkbox.classList.add('input_error');

               const errorMessage = document.createElement('div');
               errorMessage.className = 'form__error';

               input.parentNode.appendChild(errorMessage);
            }
         } else if (!validators[requiredType].test(value)) {
            input.classList.add('input_error');

            const errorMessage = document.createElement('div');
            errorMessage.className = 'form__error';

            // Вибір повідомлення про помилку в залежності від типу
            if (value === '') {
               errorMessage.textContent = input.dataset.error;
            } else {
               if (requiredType === 'phone') {
                  errorMessage.textContent = 'Enter a valid phone number!';
               } else if (requiredType === 'email') {
                  errorMessage.textContent = 'Enter a valid e-mail!';
               } else if (requiredType === 'checkbox') {
                  errorMessage.textContent = '';
               } else {
                  errorMessage.textContent = input.dataset.error;
               }
            }
            input.parentNode.appendChild(errorMessage);
         }
      });

      for (const input of inputs) {
         if (input.classList.contains('input_error')) {
            formErrorStatus = true;
            break; // Зупиняємо перебір
         } else {
            formErrorStatus = false;
         }
      }
   });
}
inputs.forEach(input => {
   input.addEventListener('input', function () {
      const previousError = input.parentNode.querySelector('.form__error');
      if (previousError) {
         previousError.remove(); // Delete message about error
         input.classList.remove('input_error'); // Delete error class

         if (checkbox) {
            console.log('Delete error');
            checkbox.classList.remove('input_error');
         }
      }
   });
});

// ==================== Popup ====================
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
/* In HTML you need to add a class 'lock-padding' for independent element,
  for example header, because it usually fixed */
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   popupLinks.forEach(elem => {
      elem.addEventListener('click', function (e) {
         const popupName = elem.getAttribute('href').replace('#', '');
         const currentPopup = document.getElementById(popupName);
         popupOpen(currentPopup);
         e.preventDefault();
      });
   })
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   popupCloseIcon.forEach(elem => {
      elem.addEventListener('click', function (e) {
         popupClose(elem.closest('.popup'));
         e.preventDefault();
      });
   })
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   if (lockPadding.length > 0) {
      lockPadding.forEach(elem => {
         elem.style.paddingRight = lockPaddingValue;
      })
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         lockPadding.forEach(elem => {
            elem.style.paddingRight = '0px';
         });
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();

// ==================== Form Send ====================
const formButton = document.getElementById('formButton');
if (formButton) {
   formButton.addEventListener('click', function () {
      if (formErrorStatus === false) {
         popupOpen(document.getElementById('popup'));
      }
   })
}

// ==================== Project Links ====================





