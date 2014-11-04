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

  parentControllerChanged: function () {
    if (this.get('parentController')) {
      this.get('parentController').on('didCreatePost', $.proxy(this.didCreatePost, this));
    }
  }.on('init').observes('parentController'),

  newPostPhotoIds: function () {
    return this.get('newPostPhotos').map(function (photo) {
      return photo.get('id');
    });
  },

  postDisabled: function () {
    var noMessage = !this.get('newPostMessage');
    var noPhotos = !this.get('newPostPhotos') || this.get('newPostPhotos').length < 1;
    var noContent = noPhotos && noMessage;

    return noContent || this.get('parentController.postDisabled');
  }.property('newPostMessage', 'newPostPhotos.[]', 'parentController.postDisabled'),

  clearPost: function () {
    this.setProperties({
      newPostPhotos: [],
      newPostMessage: null
    });
  }.observes('model').on('init'),

  didCreatePost: function (post) {
    this.get('conversationPosts').unshiftObject(post);
    this.set('newPostMessage', null);
    this.set('newPostPhotos', []);
    this.trigger('clearNewPost');
  },

  actions: {
    create: function () {
      var postProps = {
        message: this.get('newPostMessage'),
        photo_ids: this.newPostPhotoIds()
      };

      this.send('createPost', postProps);
    }
  }
});
