App.ConversationPhotosController = Ember.Controller.extend({
  needs: ['conversationPosts'],
  conversationPosts: Ember.computed.alias('controllers.conversationPosts'),

  photos: function () {
    var photos = Ember.A();

    this.get('conversationPosts').forEach(function (post) {
      post.get('photos').forEach(function (postPhoto) {
        photos.pushObject(postPhoto);
      });
    });

    return photos;
  }.property('conversationPosts', 'conversationPosts.model.[]'),

  actions: {
    getMore: function () {
      // no op
      return false;
    }
  }
});
