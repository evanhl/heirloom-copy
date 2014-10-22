// $ = jQuery. window = this. undefined = undefined.
(function ($, window, Markdown, undefined) {
  'use strict';

  var FAQ = {
    init: function () {
      this.fetchMarkdown();
    },

    fetchMarkdown: function () {
      var success;

      success = function (data) {
        this.insertConvertedMarkdownOnPage(data);
        this.cacheElements();
        this.formatHtml();
        this.bindEventListeners();
      };

      $.ajax({
        url:      '/markdown/faq.markdown.html',
        dataType: 'html',
        success:  success.bind(this)
      });
    },

    insertConvertedMarkdownOnPage: function (data) {
      var converter, html;

      converter = new Markdown.Converter();
      html      = converter.makeHtml(data);

      $('#faq').html(html);
    },

    cacheElements: function () {
      this.elms = {
        $faq: $('#faq'),
        $h2:  $('h2')
      };
    },

    formatHtml: function () {
      var wrapAnswers;

      wrapAnswers = function () {
        $(this).nextUntil('h2').wrapAll($('<div/>', { 'class': 'answer' }));
      };

      this.elms.$h2.each(wrapAnswers);
    },

    bindEventListeners: function () {
      var accordian;

      accordian = function (event) {
        $(event.target).next('.answer').slideToggle('fast');
      };

      this.elms.$h2.on('click', accordian);
    }
  };

  // NOTE: `page:load` might not be necessary. Not sure how these pages behave with Ember and all that.
  // Throwing here just-in-case. Remove if
  $(document).on('ready page:load', function () {
    FAQ.init();
  });

  // Makes app global for debugging purposes. Might want to remove before rolling live.
  window.FAQ = FAQ || {};

}(window.jQuery, this, window.Markdown));
