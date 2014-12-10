App.ApplicationView = Ember.View.extend({
  classNameBindings: ['hasTouch:has-touch'],
  hasTouch: function () {
    return Utils.hasTouch();
  }.property()
});
