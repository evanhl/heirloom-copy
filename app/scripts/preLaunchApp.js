var App = Ember.Application.create({});

App.ApplicationView = Ember.View.extend({
  templateName: 'preLaunch',

  didInsertElement: function () {
    this.$('a[href*=#]:not([href=#])').on('click', this.smoothScrollAnchorLinks);
  },

  willDestroyElement: function () {
    this.$('a[href*=#]:not([href=#])').off('click', this.smoothScrollAnchorLinks);
  },

  // lifted from here: http://css-tricks.com/snippets/jquery/smooth-scrolling/
  smoothScrollAnchorLinks: function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
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
