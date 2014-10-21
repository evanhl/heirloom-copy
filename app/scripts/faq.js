// $ = jQuery. window = this. undefined = undefined.
(function ($, window, undefined) {
  'use strict';

  var FAQ = {
    init: function () {
      this.parseMarkdown();
      this.insertHtmlOnPage();
      this.cacheElements();
      this.bindEventListeners();
    },

    parseMarkdown: function () {
      var faqMarkdown;

      fs.readFile('./app/markdown/faq.md', function (err, data) {
        if (err) { throw err; }
        faqMarkdown = data;
      });

      this.faqHtml = markdown.toHTML(faqMarkdown);
    },

    insertHtmlOnPage: function () {
      $('[role="main"]').html(this.faqHtml);
    },

    cacheElements: function () {
      this.elms = {
        $h2: $('h2')
      };
    },

    bindEventListeners: function () {
      var accordian;

      accordian = function (event) {
        $(event.target).next('p').slideToggle('fast');
      };

      this.elms.$h2.on('click', accordian);
    }
  };

  $(document).ready(function () {
    FAQ.init();
  });

  // Makes app global for debugging purposes. Might want to remove before rolling live.
  window.FAQ = FAQ || {};

}(jQuery, this));
