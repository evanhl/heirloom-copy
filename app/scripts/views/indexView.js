App.IndexView = Ember.View.extend(App.HiddenNavMixin, {
  classNames: ['homepage'],
  templateName: HLConfig.homeTemplate || 'homepage',

  didInsertElement: function () {
    this.controller.set('disabled', false);
    this.controller.set('notifyButtonText', "Notify Me");
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('a[href*=#]:not([href=#])').on('click', this.smoothScrollAnchorLinks);
      this.$('iframe').on('load', $.proxy(this.iframeOnload, this));
      this.$('#email-form').on('submit', $.proxy(this.onSubmit, this));
      this.$('.hp-text').on('keypress', $.proxy(this.onKeyPress, this));
      this.$('.jump-to-notify').on('click', $.proxy(this.jumpToNotify, this));
    });
  },

  willDestroyElement: function () {
    this.$('a[href*=#]:not([href=#])').off();
    this.$('iframe').off();
    this.$('#email-form').off();
    this.$('.jump-to-notify').off();
    this.$('a[href*=#]:not([href=#])').off();
  },

  iframeOnload: function () {
    if (!this.get('iframeOnloadIsElig')) { return; }

    this.controller.set('notifyButtonText', "Sent");
    this.controller.set('disabled', false);

    this.$('.hp-text').val('');
  },

  onKeyPress: function (e) {
    if (e.keyCode === 13) {
      this.$('#email-form').submit();
    }

    this.controller.set('notifyButtonText', "Notify Me");
  },

  onSubmit: function () {
    // some browsers fire an iframe onload willy nilly on page load
    this.set('iframeOnloadIsElig', true);
    this.controller.set('disabled', true);
  },

  jumpToNotify: function (e) {
    var self = this;

    setTimeout(function () {
      self.$('.hp-text').focus();
    }, 500);
  },

  // lifted from here: http://css-tricks.com/snippets/jquery/smooth-scrolling/
  smoothScrollAnchorLinks: function (e) {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  }
});

