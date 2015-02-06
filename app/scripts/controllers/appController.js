App.AppRoute = Ember.Route.extend({
  beforeModel: function () {
    if (Utils.isAndroid()) {
      window.location = Utils.ANDROID_STORE_LINK;
    } else if (Utils.isIos()) {
      window.location = Utils.IOS_STORE_LINK;
    }
  }
});
