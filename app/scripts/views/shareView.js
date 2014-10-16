App.ShareView = Ember.View.extend({
  addBodyGradient: function () {
    $('body').addClass('alternate-bg');
  }.on('didInsertElement'),

  removeBodyGradient: function () {
    $('body').removeClass('alternate-bg');
  }.on('willDestroyElement'),

  addMeta: function () {
    var photoLargeUrl;

    $('head meta[property="og:image"]').remove();
    photoLargeUrl = this.get('controller.photo.largeVersion');

    $('<meta>').
      attr('property', 'og:image').
      attr('content', photoLargeUrl).appendTo($('head'));

    if (photoLargeUrl) {
      // tells Prerender.io that it can commence snapshotting.
      window.prerenderReady = true;
    }
  }.observes('controller.photo'),

  removeMeta: function () {
    $('head meta[property="og:image"]').remove();
  }.on('willDestroyElement')
});