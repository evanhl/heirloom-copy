App.MetaTagMixin = Ember.Mixin.create({
  metaWaitUntil: [],

  addMetaTags: function () {
    var photoLargeUrl;

    this.removeMetaTags();

    this.addMetaTag('og:title', this.get('metaTitle'));
    this.addMetaTag('twitter:title', this.get('metaTitle'));

    this.addMetaTag('og:image', this.get('metaImage'));
    this.addMetaTag('twitter:image:src', this.get('metaImage'));

    this.addMetaTag('og:description', this.get('metaDescription'));
    this.addMetaTag('description', this.get('metaDescription'));
    this.addMetaTag('twitter:description', this.get('metaDescription'));

    var isReady = this.get('metaWaitUntil').map(function (attr) {
      return this.get(attr);
    }, this).every(function (metaValue) {
      return metaValue;
    });

    if (isReady) {
      // tells Prerender.io that it can commence snapshotting.
      window.prerenderReady = true;
    }
  }.on('didInsertElement').observes('metaImage', 'metaDescription', 'metaTitle'),

  removeMetaTags: function () {
    $('head meta[property="og:image"]').remove();
    $('head meta[property="og:description"]').remove();
    $('head meta[property="og:title"]').remove();
    $('head meta[name="description"]').remove();
    $('head meta[name="twitter:description"]').remove();
    $('head meta[name="twitter:image:src"]').remove();
    $('head meta[name="twitter:title"]').remove();
  }.on('willDestroyElement'),

  addMetaTag: function (property, content) {
    var htmlPropName;

    if (!content) {
      return;
    }

    if (property.indexOf('og:') === 0) {
      htmlPropName = 'property';
    } else {
      htmlPropName = 'name';
    }

    $('<meta>').
      attr(htmlPropName, property).
      attr('content', content).
      appendTo($('head'));
  }
});
