//= require basePhotoController
App.ConversationPostPhotoController = App.BasePhotoController.extend({
  needs: ['conversationPosts', 'conversationPhotos'],
  conversationPosts: Ember.computed.alias('controllers.conversationPosts'),
  photos: Ember.computed.alias('controllers.conversationPhotos'),
  conversationId: Ember.computed.alias('conversationPosts.conversationId'),
  photosModel: Ember.computed.alias('photos.photos'),
  metadataDisabled: true,

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('conversationPostPhoto', this.get('conversationId'), toId);
  },

  // the observes on the base class was getting triggered in the middle of the post
  // getting unshifted on the array in ConversationPostsController, which was causing
  // the last post's photos to be ignored. therefore, let's turn this into a no op.
  photosUntilEndChanged: function () {},

  actions: {
    toCollection: function () {
      this.transitionToRoute('conversationPosts', this.get('conversationId'));
    }
  }
});
