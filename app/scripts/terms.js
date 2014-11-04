// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, Markdown, undefined) {
  'use strict';

  var Terms = {

    init: function () {
      this.fetchMarkdown();
    },

    fetchMarkdown: function () {
      var success;

      success = function (data) {
        this.insertConvertedMarkdownOnPage(data);
      };

      $.ajax({
        url:      '/markdown/terms.md',
        dataType: 'html',
        success:  success.bind(this)
      });
    },

    insertConvertedMarkdownOnPage: function (data) {
      var converter, html;

      converter = new Markdown.Converter();
      html      = converter.makeHtml(data);

      $('#terms').html(html);
    }
  };

  $(document).ready(function () {
    Terms.init();
  });

  // Makes app global for debugging purposes. Might want to remove before rolling live.
  window.Terms = Terms || {};

}(window.jQuery, this, this.Markdown));
