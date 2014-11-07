// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, MD, undefined) {
  'use strict';

  var Terms = $.extend(MD, {
    $el: $('#terms'),
    filename: 'terms',
    init: function () {
      this.fetchMarkdown();
    }
  });

  $(document).ready(function () {
    Terms.init();
  });
}(window.jQuery, this, this.MD));
