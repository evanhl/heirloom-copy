App.ShareView = Ember.View.extend({
  addBodyGradient: function () {
    $('body').addClass('alternate-bg');
  }.on('didInsertElement'),

  removeBodyGradient: function () {
    $('body').removeClass('alternate-bg');
  }.on('willDestroyElement')
});