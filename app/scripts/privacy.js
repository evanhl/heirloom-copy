// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, Markdown, undefined) {
  'use strict';

  var Privacy = {

    init: function () {
      this.fetchMarkdown();
    },

    fetchMarkdown: function () {
      var success;

      success = function (data) {
        this.insertConvertedMarkdownOnPage(data);
      };

      $.ajax({
        url:      '/markdown/privacy.md',
        dataType: 'html',
        success:  success.bind(this)
      });
    },

    insertConvertedMarkdownOnPage: function (data) {
      var converter, html;

      converter = new Markdown.Converter();
      html      = converter.makeHtml(data);

      $('#privacy').html(html);
    }
  };

  $(document).ready(function () {
    Privacy.init();
  });

  // Makes app global for debugging purposes. Might want to remove before rolling live.
  window.Privacy = Privacy || {};

}(window.jQuery, this, this.Markdown));
