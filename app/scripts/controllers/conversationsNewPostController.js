App.ConversationsNewPostController = Ember.ObjectController.extend(Ember.Evented, {
  needs: ['conversationPosts', 'photoPicker'],
  conversationPosts: Ember.computed.alias('controllers.conversationPosts'),
  photoPicker: Ember.computed.alias('controllers.photoPicker'),
  newPostMessage: null,
  newPostPhotos: null,

  init: function () {
    var self = this;
    this.get('photoPicker').on('photosAdded', function (addedPhotoIds) {
      var addedPhotos = addedPhotoIds.map(function (id) { return App.Photo.find(id); });
      self.get('newPostPhotos').pushObjects(addedPhotos);
    });
    this._super();
  },

  newPostPhotoIds: function () {
    return this.get('newPostPhotos').map(function (photo) {
      return photo.get('id');
    });
  },

  clearPost: function () {
    this.setProperties({
      newPostPhotos: [],
      newPostMessage: null
    });
  }.observes('model').on('init'),

  actions: {
    create: function () {
      var adapter = App.Conversation.adapter;
      var self = this;
      var conversation = self.get('model');
      var postProps = {
        message: this.get('newPostMessage'),
        photo_ids: this.newPostPhotoIds()
      };
      var post = App.Post.create(postProps);

      adapter.createNestedRecord(conversation, post, 'posts').then(function () {
        self.get('conversationPosts').unshiftObject(post);
        self.set('newPostMessage', null);
        self.set('newPostPhotos', []);
        self.trigger('clearNewPost');
      }, function () {
        // TODO: handle failure
      });
    }
  }
});
