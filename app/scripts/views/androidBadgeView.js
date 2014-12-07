//= require trackLinkMixin

App.AndroidBadgeView = Ember.View.extend(App.TrackLinkMixin, {
  tagName: 'a',
  attributeBindings: ['target:target', 'androidStoreLink:href'],
  androidStoreLink: function () {
    return Utils.ANDROID_STORE_LINK;
  }.property(),
  target: '_blank'
});