// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, MD, undefined) {
  'use strict';

  var Press = $.extend(MD, {
    $els: [ $('.copy').children('p').eq(0), $('#press-releases').children('div').eq(0) ],
    filenames: 'press press_releases'.split(' '),
    init: function () {
      this.fetchMarkdown();
    }
  });

  $(document).ready(function () {
    Press.init();
  });
}(window.jQuery, this, this.MD));
