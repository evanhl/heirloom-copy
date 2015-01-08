// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, MD, undefined) {
  'use strict';

  var Press = $.extend(MD, {
    $els: [ $('.copy').children('p').eq(0) ],
    filenames: ['press'],
    init: function () {
      this.fetchMarkdown();
      this.initSlick();
    },

    initSlick: function () {
      $('.articles').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 600
      });
    }
  });

  $(function () {
    Press.init();
  });
}(window.jQuery, this, this.MD));
