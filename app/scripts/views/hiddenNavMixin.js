App.HiddenNavMixin = Ember.Mixin.create({
  shouldHideNav: function () {
    return true;
  }.property(),

  hideNav: function () {
    App.set('hideNav', this.get('shouldHideNav'));
  }.on('didInsertElement').observes('shouldHideNav'),

  showNav: function () {
    App.set('hideNav', false);
  }.on('willDestroyElement')
});
