// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, MD, undefined) {
  'use strict';

  var Privacy = $.extend(MD, {
    $el: $('#privacy'),
    filename: 'privacy',
    init: function () {
      this.fetchMarkdown();
    }
  });

  $(document).ready(function () {
    Privacy.init();
  });
}(window.jQuery, this, this.MD));
