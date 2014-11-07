// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, Markdown, undefined) {
  'use strict';

  var MD = {
    // This method can handle an array of file names to fetch OR a single string of a filename to fetch.
    // One crappy thing about the way this method currently works is it fetches for each file. Fetchinga single file
    // that contained markdown for multiple different sections on the page and the parsing it would be a non-trivial
    // amount of work and require some engineering design decisions. Glad to talk over them if this current method is
    // hated. -- Jesse
    fetchMarkdown: function () {
      var ajax;

      ajax = function (filename, index) {
        $.ajax({
          url:      '/markdown/' + filename + '.md',
          dataType: 'html',
          success:  this.success.bind(this, index)
        });
      }.bind(this);

      if (this.filenames && this.filenames instanceof Array) {
        $.each(this.filenames, function (index, filename) {
          ajax(filename, index);
        });
      } else {
        ajax(this.filename);
      }
    },

    success: function (index, data) {
      this.insertConvertedMarkdownOnPage(index, data);
    },

    insertConvertedMarkdownOnPage: function (index, data) {
      var converter, html, $el;

      converter = new Markdown.Converter();
      html      = converter.makeHtml(data);
      $el       = this.$els ? this.$els[index] : this.$el;

      $el.html(html);
    }
  };

  window.MD = MD || {};

}(window.jQuery, this, this.Markdown));
