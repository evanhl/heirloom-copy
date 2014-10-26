// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, Markdown, undefined) {
  'use strict';

  var FAQ = {
    ANIMATIONSPEED: 'fast',

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
        url:      '/markdown/faq.md',
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
        $bodyAndHtml: $('html, body'),
        $faq:         $('#faq'),
        $h1:          $('h1'),
        $h2:          $('h2')
      };
    },

    formatHtml: function () {
      var wrapAnswers, appendBackToTopLinks, questionTitleInfo, prependNameAnchorsToH2s, lis;

      lis = '';

      // Needed for accordian animation.
      wrapAnswers = function () {
        $(this).nextUntil('h2').wrapAll($('<div/>', { 'class': 'answer' }));
      };

      prependNameAnchorsToH2s = function () {
        var text  = $(this).text(),
            name  = text.replace(/\s+/g, '-').toLowerCase(),
            attrs = { 'class': 'title-anchors', data: {} };

        attrs.name        = name;
        attrs.data.title  = text;

        $('<a/>', attrs).insertBefore($(this));
      };

      appendBackToTopLinks = function () {
        $('.answer').append($('<a/>', { 'class': 'back-to-top', href: '#top', text: 'Back To Top' } ));
      };

      questionTitleInfo = function () {
        this.elms.$titleAnchors = $('.title-anchors');

        return this.elms.$titleAnchors.map(function () {
          var linkInfo = {};

          linkInfo.name  = $(this).attr('name');
          linkInfo.title = $(this).data('title');

          return linkInfo;
        });
      };

      this.elms.$h2.each(function () {
        wrapAnswers.call(this);
        prependNameAnchorsToH2s.call(this);
      });

      appendBackToTopLinks();

      $.each(questionTitleInfo.call(this), function () {
        lis += '<li><a class="question" href="#' + this.name + '">' + this.title + '</a></li>';
      });

      // Creates the unorder list element to insert the question list into.
      this.elms.$h1.after($('<ul/>', { 'class': 'questions' }).html(lis));
      this.elms.$faq.prepend($('<a/>', { 'name': 'top' }));
      this.elms.$question = $('.question');

      // The Markdown parser inserts dumb empty paragraphs. Hopefully I can remove this code soon once I
      // figure out what's up, but for now manually removing.
      $('p').each(function () {
        if ($(this).is(':empty')) {
          $(this).remove();
        }
      });
    },

    bindEventListeners: function () {
      var accordian, scrollToQuestion, scrollToTop;

      accordian = function () {
        var $this = $(this);

        $this.toggleClass('expanded');
        $this.next('.answer').slideToggle('fast');
      };

      // NOTE: The deeplinking works without JavaScript, however if the user has JavaScript we're going to
      // give them a fancy animation to scroll to it.
      scrollToQuestion = function (event) {
        event.preventDefault();

        var self, name, $anchor, yPosition;

        self      = event.data.namespace;
        name      = $(this).attr('href').substring(1);
        $anchor   = self.elms.$titleAnchors.filter(function () { return $(this).attr('name') === name; });
        yPosition = Math.floor($anchor.offset().top - $('header').outerHeight(true) - 5);

        self.elms.$bodyAndHtml.stop().animate({ scrollTop: yPosition }, self.ANIMATIONSPEED);
      };

      scrollToTop = function (event) {
        event.preventDefault();
        var self = event.data.namespace;

        self.elms.$bodyAndHtml.stop().animate({ scrollTop: 0 }, self.ANIMATIONSPEED);
      };

      this.elms.$h2.on('click', accordian);
      this.elms.$question.on('click', { namespace: this }, scrollToQuestion);
      $('.back-to-top').on('click', { namespace: this }, scrollToTop);
    }
  };

  // NOTE: `page:load` might not be necessary. Not sure how these pages behave with Ember and all that.
  // Throwing here just-in-case. Evan, remove if not needed.
  $(document).on('ready page:load', function () {
    FAQ.init();
  });

}(window.jQuery, this, this.Markdown));
