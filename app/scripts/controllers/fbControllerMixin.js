App.FbControllerMixin = Ember.Mixin.create({
  setup: function () {
    App.get('facebook').initFacebook();
  },

  isFbInit: function () {
    return App.get('facebook.isInit');
  }.property('App.facebook.isInit')
})