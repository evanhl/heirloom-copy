App.IosBadgeController = Ember.Controller.extend({
  iosStoreLink: function () {
    return Utils.IOS_STORE_LINK;
  }.property()
});