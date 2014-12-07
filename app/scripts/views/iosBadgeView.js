//= require trackLinkMixin

App.IosBadgeView = Ember.View.extend(App.TrackLinkMixin, {
  tagName: 'a',
  attributeBindings: ['target:target', 'iosStoreLink:href'],
  iosStoreLink: function () {
    return Utils.IOS_STORE_LINK;
  }.property(),
  target: '_blank'
});