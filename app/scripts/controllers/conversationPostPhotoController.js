//= require basePhotoController
App.ConversationPostPhotoController = App.BasePhotoController.extend({
  needs: ['conversationPosts', 'conversationPhotos'],
  conversationPosts: Ember.computed.alias('controllers.conversationPosts'),
  photos: Ember.computed.alias('controllers.conversationPhotos'),
  conversationId: Ember.computed.alias('conversationPosts.conversationId'),
  photosModel: Ember.computed.alias('photos.model'),

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('conversationPostPhoto', this.get('conversationId'), toId);
  },

  actions: {
    toCollection: function () {
      this.transitionToRoute('conversationPosts', this.get('conversationId'));
    }
  }
});
