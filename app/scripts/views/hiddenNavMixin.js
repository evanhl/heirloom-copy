App.HiddenNavMixin = Ember.Mixin.create({
  shouldHideNav: function () {
    return true;
  }.property(),

  hideNav: function () {
    if (this.get('shouldHideNav')) {
      App.set('hideNav', true);
    }
  }.on('didInsertElement'),

  showNav: function () {
    App.set('hideNav', true);
  }.on('willDestroyElement')
});
