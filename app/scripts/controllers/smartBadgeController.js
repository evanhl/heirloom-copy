App.SmartBadgeController = Ember.Controller.extend({
  isAndroid: function () {
    return Utils.isAndroid();
  }.property(),

  isIos: function () {
    return Utils.isIos();
  }.property()
});