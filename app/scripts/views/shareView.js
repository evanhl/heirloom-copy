//= require ./metaTagMixin
App.ShareView = Ember.View.extend(App.MetaTagMixin, {
  metaDescription: 'Fast, beautiful scanning for all the moments we love.',
  metaImage: Ember.computed.alias('controller.photo.largeVersion'),
  metaTitle: 'Heirloom | For all the moments we love',
  metaTwitterCardType: 'photo',
  metaWaitUntil: ['metaImage']
});