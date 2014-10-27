App.ApplicationController = Ember.Controller.extend({
  hideNav: function () {
    return App.get('hideNav');
  }.property('App.hideNav')
});

