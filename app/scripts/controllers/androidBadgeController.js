App.AndroidBadgeController = Ember.Controller.extend({
  androidStoreLink: function () {
    return Utils.ANDROID_STORE_LINK;
  }.property()
});