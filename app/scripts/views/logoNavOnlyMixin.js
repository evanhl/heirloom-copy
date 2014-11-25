App.LogoNavOnlyMixin = Ember.Mixin.create({
  setupLno: function () {
    App.set('logoNavOnly', true);
  }.on('didInsertElement'),

  teardownLno: function () {
    App.set('logoNavOnly', false);
  }.on('willDestroyElement')
});
