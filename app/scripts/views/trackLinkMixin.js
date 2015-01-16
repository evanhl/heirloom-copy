App.TrackLinkMixin = Ember.Mixin.create({
  trackLinks: function () {
    this.$().click(function (e) {
      var newWindow = $(this).attr('target') === '_blank';

      e.preventDefault();

      App.get('analytics').trackOutboundLink($(this).attr('href'), newWindow);
    });
  }.on('didInsertElement')
});