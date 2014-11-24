App.MetaTagMixin = Ember.Mixin.create({
  metaWaitUntil: [],

  addMetaTags: function () {
    var photoLargeUrl;

    this.removeMetaTags();

    this.addMetaTag('og:title', this.get('metaTitle'));
    this.addMetaTag('twitter:title', this.get('metaTitle'));

    this.addImageTags();

    this.addMetaTag('og:description', this.get('metaDescription'));
    this.addMetaTag('description', this.get('metaDescription'));
    this.addMetaTag('twitter:description', this.get('metaDescription'));

    this.addCanonicalTag(this.getCanonical());

    var isReady = this.get('metaWaitUntil').map(function (attr) {
      return this.get(attr);
    }, this).every(function (metaValue) {
      return metaValue;
    });

    if (isReady) {
      // tells Prerender.io that it can commence snapshotting.
      window.prerenderReady = true;
    }
  }.on('didInsertElement').observes('metaImages', 'metaDescription', 'metaTitle'),

  addImageTags: function () {
    if (this.get('metaImages.length') === 1) {
      this.addMetaTag('twitter:card', 'photo');
      this.addMetaTag('og:image', this.get('metaImages').objectAt(0));
      this.addMetaTag('twitter:image:src', this.get('metaImages').objectAt(0));

    } else if (this.get('metaImages.length') > 1) {
      this.addMetaTag('twitter:card', 'gallery');
      this.get('metaImages').forEach(function (image, index) {
        this.addMetaTag('og:image', image);
        this.addMetaTag('twitter:image' + index, image);
      }, this);

    } else {
      this.addMetaTag('twitter:card', 'summary');
    }
  },

  getCanonical: function () {
    return HLConfig.canonicalDomain + window.location.pathname;
  },

  removeMetaTags: function () {
    $('head link[rel="canonical"]').remove();
    $('head meta[property="og:image"]').remove();
    $('head meta[property="og:description"]').remove();
    $('head meta[property="og:title"]').remove();
    $('head meta[name="description"]').remove();
    $('head meta[name="twitter:description"]').remove();
    $('head meta[name="twitter:image:src"]').remove();
    $('head meta[name="twitter:title"]').remove();
    $('head meta[name="twitter:card"]').remove();
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
  },

  addCanonicalTag: function (url) {
    $('<link>').
      attr('href', url).
      attr('rel', 'canonical').
      appendTo($('head'));
  }
});
