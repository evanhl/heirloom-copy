App.SmartBadgeController = Ember.Controller.extend({
  isAndroid: function () {
    return Utils.isAndroid();
  }.property(),

  isIos: function () {
    return Utils.isIos();
  }.property(),

  iosStoreLink: function () {
    return Utils.IOS_STORE_LINK;
  }.property(),

  androidStoreLink: function () {
    return Utils.ANDROID_STORE_LINK;
  }.property(),
});