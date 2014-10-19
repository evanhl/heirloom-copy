App.MetaTagMixin = Ember.Mixin.create({
  metaWaitUntil: [],

  addMetaTags: function () {
    var photoLargeUrl;

    this.removeMetaTags();
    this.addMetaTag('og:image', this.get('metaImage'));
    this.addMetaTag('og:description', this.get('metaDescription'));

    var isReady = this.get('metaWaitUntil').map(function (attr) {
      return this.get(attr);
    }, this).every(function (metaValue) {
      return metaValue;
    });

    if (isReady) {
      // tells Prerender.io that it can commence snapshotting.
      window.prerenderReady = true;
    }
  }.on('didInsertElement').observes('metaImage', 'metaDescription'),

  removeMetaTags: function () {
    $('head meta[property="og:image"]').remove();
    $('head meta[property="og:description"]').remove();
  }.on('willDestroyElement'),

  addMetaTag: function (property, content) {
    if (!content) {
      return;
    }

    $('<meta>').
      attr('property', property).
      attr('content', content).
      appendTo($('head'));
  }
});
