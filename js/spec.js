'use strict';

(function (root) {

  // $('.font-size__slider').ionRangeSlider({
  //   min: 100,
  //   max: 300,
  //   postfix: '%',
  //   onChange: function() {
  //     console.log(this)
  //   }
  // });

  var store = window.localStorage,
      fs = store.getItem('font-size');

  if (store.getItem('black-white') == 1) {
    $('.page').addClass('page_black-white');
  }

  if (!fs) {
    store.setItem('font-size', 100);
    fs = store.getItem('font-size');
  }

  $('.page__wrapper').fadeIn(500);

  $('.font-size__btn').on('click', function () {
    var size = $(this).data('size');
    store.setItem('font-size', size);

    $('.page__wrapper').css('font-size', size + '%');
  });

  $('.font-size__btn[data-size="' + fs + '"]').trigger('click');

  $('.black-white').on('click', function () {
    $('.page').toggleClass('page_black-white');

    store.getItem('black-white') == 0 ? store.setItem('black-white', 1) : store.setItem('black-white', 0);
  });

  // setInterval(function() {
  //   $('.black-white').trigger('click');
  // }, 10)
})(window);