// $ = jQuery. window = this. Markdown = this.Markdown, undefined = undefined.
(function ($, window, Markdown, MD, undefined) {
  'use strict';

  var FAQ = $.extend(MD, {
    ANIMATIONSPEED: 'fast',
    $el: $('#faq'),
    filename: 'faq',
    init: function () {
      this.fetchMarkdown();
      this.addHeaderLink();
    },

    addHeaderLink: function () {
      if (window.location.pathname.match(/^\/webFaq$/)) {
        $('header .logo-with-text').wrap('<a href="/"></a>');
      }
    },

    success: function (index, data) {
      this.insertConvertedMarkdownOnPage(index, data);
      this.cacheElements();
      this.formatHtml();
      this.bindEventListeners();
    },

    cacheElements: function () {
      this.elms = {
        $bodyAndHtml: $('html, body'),
        $faq:         $('#faq'),
        $h1:          $('h1'),
        $h2:          $('h2'),
        $h3:          $('h3')
      };
    },

    formatHtml: function () {
      var wrapAnswers, prependNameAnchorsToH2s, wrapSections;

      // Needed for accordion animation.
      wrapAnswers = function () {
        $(this).nextUntil('h3,h2').wrapAll($('<div/>', { 'class': 'answer' }));
      };

      wrapSections = function () {
        $(this).nextUntil('h2').wrapAll($('<div/>', { 'class': 'section' }));
      };

      /**
       * This allows deeplinking to a FAQ. Useful for email and Twitter responses.
       * Example: http://heirloom.net/faq.html#how-do-i-upload-a-photo?
       * Feel free to kill this method if you swear you're never going to use deeplinking here (hint: you will).
       */
      prependNameAnchorsToH2s = function () {
        var text  = $(this).text(),
            name  = text.replace(/\s+/g, '-').toLowerCase(),
            attrs = { 'class': 'title-anchors', data: {} };

        attrs.name        = name;
        attrs.data.title  = text;

        $('<a/>', attrs).insertBefore($(this));
      };

      this.elms.$h3.each(function () {
        wrapAnswers.call(this);
        // prependNameAnchorsToH2s.call(this);
      });

      this.elms.$h2.each(function () {
        wrapSections.call(this);
      });

      // The Markdown parser inserts dumb empty paragraphs. Hopefully I can remove this code soon once I
      // figure out what's up, but for now manually removing.
      $('p').each(function () {
        if ($(this).is(':empty')) {
          $(this).remove();
        }
      });
    },

    /**
     * Not currently called anywhere. If at a later date you Heirloom folks want to have an index at the top of your
     * FAQ page complete with scrolling animations just call this method somewhere and add
     * `this.elms.$question.on('click', { namespace: this }, scrollToQuestion);` to the event bindings.
     */
    createIndexLinks: function () {
      var appendBackToTopLinks, questionTitleInfo, lis;

      lis = '';

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

      appendBackToTopLinks();

      $.each(questionTitleInfo.call(this), function () {
        lis += '<li><a class="question" href="#' + this.name + '">' + this.title + '</a></li>';
      });

      // Creates the unorder list element to insert the question list into.
      this.elms.$h1.after($('<ul/>', { 'class': 'questions' }).html(lis));
      this.elms.$faq.prepend($('<a/>', { 'name': 'top' }));
      this.elms.$question = $('.question');

    },

    bindEventListeners: function () {
      var accordion, scrollToQuestion, scrollToTop, sectionAccordion;

      accordion = function () {
        var $this = $(this);

        $this.toggleClass('expanded');
        $this.next('.answer').slideToggle('fast');
      };

      sectionAccordion = function () {
        var $this = $(this);

        $this.toggleClass('expanded');
        $this.next('.section').slideToggle('fast');
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

      this.elms.$h2.on('click', sectionAccordion);
      this.elms.$h3.on('click', accordion);
      $('.back-to-top').on('click', { namespace: this }, scrollToTop);
    }
  });

  // NOTE: `page:load` might not be necessary. Not sure how these pages behave with Ember and all that.
  // Throwing here just-in-case. Evan, remove if not needed.
  $(document).on('ready page:load', function () {
    FAQ.init();
  });

}(window.jQuery, this, this.Markdown, this.MD));
