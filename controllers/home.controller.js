angular.module('Impactrun', []).controller('HomeController', HomeController);

function HomeController($scope, $location, anchorSmoothScroll) {
 $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);

    };
    var loader = function() {
        $("#loader").delay(4000).fadeOut(400, function() {
            $("body").fadeIn(400);
        });
    };
    new WOW().init();
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: '.swiper-pagination',
    //     paginationClickable: true,
    //     spaceBetween: 30,
    //     centeredSlides: true,
    //     autoplay: 25000,
    //     autoplayDisableOnInteraction: false
    // });

    // function init() {
    //     window.addEventListener('scroll', function(e) {
    //         var distanceY = window.pageYOffset || document.documentElement.scrollTop,
    //             shrinkOn = 100,
    //             header1 = document.querySelector("header1");
    //         if (distanceY > shrinkOn) {
    //             classie.add(header1, "smaller");
    //         } else {
    //             if (classie.has(header1, "smaller")) {
    //                 classie.remove(header1, "smaller");
    //             }
    //         }
    //     });
    // }
    // window.onload = init();

    // (function(window) {

    //     function classReg(className) {
    //         return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    //     }

    //     var hasClass, addClass, removeClass;

    //     if ('classList' in document.documentElement) {
    //         hasClass = function(elem, c) {
    //             return elem.classList.contains(c);
    //         };
    //         addClass = function(elem, c) {
    //             elem.classList.add(c);
    //         };
    //         removeClass = function(elem, c) {
    //             elem.classList.remove(c);
    //         };
    //     } else {
    //         hasClass = function(elem, c) {
    //             return classReg(c).test(elem.className);
    //         };
    //         addClass = function(elem, c) {
    //             if (!hasClass(elem, c)) {
    //                 elem.className = elem.className + ' ' + c;
    //             }
    //         };
    //         removeClass = function(elem, c) {
    //             elem.className = elem.className.replace(classReg(c), ' ');
    //         };
    //     }

    //     function toggleClass(elem, c) {
    //         var fn = hasClass(elem, c) ? removeClass : addClass;
    //         fn(elem, c);
    //     }

    //     var classie = {
    //         // full names
    //         hasClass: hasClass,
    //         addClass: addClass,
    //         removeClass: removeClass,
    //         toggleClass: toggleClass,
    //         // short names
    //         has: hasClass,
    //         add: addClass,
    //         remove: removeClass,
    //         toggle: toggleClass
    //     };

    //     // transport
    //     if (typeof define === 'function' && define.amd) {
    //         // AMD
    //         define(classie);
    //     } else {
    //         // browser global
    //         window.classie = classie;
    //     }
    // })(window);



    $(document).ready(function() {
        loader();
    });

}