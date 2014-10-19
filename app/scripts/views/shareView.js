//= require ./metaTagMixin
App.ShareView = Ember.View.extend(App.MetaTagMixin, {
  metaDescription: 'Fast, beautiful scanning for all the moments we love.',
  metaImage: Ember.computed.alias('controller.photo.largeVersion'),
  metaTitle: 'Heirloom',
  metaTwitterCardType: 'photo',
  metaWaitUntil: ['metaImage'],

  addBodyGradient: function () {
    $('body').addClass('alternate-bg');
  }.on('didInsertElement'),

  removeBodyGradient: function () {
    $('body').removeClass('alternate-bg');
  }.on('willDestroyElement')
});