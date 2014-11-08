App.ConversationsNewPostController = Ember.ObjectController.extend(Ember.Evented, {
  needs: ['conversationPosts', 'groupAlbumPicker', 'groupPhotoPicker'],
  groupPhotoPicker: Ember.computed.alias('controllers.groupPhotoPicker'),
  groupAlbumPicker: Ember.computed.alias('controllers.groupAlbumPicker'),
  conversationPosts: Ember.computed.alias('controllers.conversationPosts'),
  newPostMessage: null,
  newPostAlbum: null,
  newPostPhotos: null,

  attachPickerHandlers: function () {
    // TODO: make these event names consistent
    // TODO: these events can be handled via action bubbling instead of explicit reference to child modal controllers
    this.get('groupAlbumPicker').on('didSelect', this, this.albumSelected);
    this.get('groupPhotoPicker').on('photosSelected', this, this.photosSelected);
  },

  detachPickerHandlers: function () {
    this.get('groupAlbumPicker').off('didSelect', this, this.albumSelected);
    this.get('groupPhotoPicker').off('photosSelected', this, this.photosSelected);
  },

  parentControllerChanged: function () {
    if (this.get('parentController')) {
      this.get('parentController').off('didCreatePost', this, this.didCreatePost);
      this.get('parentController').on('didCreatePost', this, this.didCreatePost);
    }
  }.on('init').observes('parentController'),

  newPostPhotoIds: function () {
    return this.get('newPostPhotos').map(function (photo) {
      return photo.get('id');
    });
  },

  albumSelected: function (album) {
    this.set('newPostAlbum', album);
  },

  photosSelected: function (photoIds) {
    var photos = photoIds.map(function (photoId) {
      return App.Photo.find(photoId);
    });

    this.get('newPostPhotos').pushObjects(photos);
  },

  postDisabled: function () {
    var noMessage = !this.get('newPostMessage');
    var noPhotos = !this.get('newPostPhotos') || this.get('newPostPhotos').length < 1;
    var noAlbum = !this.get('newPostAlbum');
    var noContent = noPhotos && noMessage && noAlbum;

    return noContent || this.get('parentController.postDisabled');
  }.property('newPostMessage', 'newPostPhotos.[]', 'newPostAlbum', 'parentController.postDisabled'),

  addPhotosDisabled: function () {
    return this.get('newPostAlbum');
  }.property('newPostAlbum'),

  addAlbumDisabled: function () {
    return this.get('newPostPhotos.length') || this.get('newPostAlbum');
  }.property('newPostPhotos.[]', 'newPostAlbum'),

  clearPost: function () {
    this.setProperties({
      newPostPhotos: [],
      newPostMessage: null,
      newPostAlbum: null
    });
  }.observes('model').on('init'),

  didCreatePost: function (post) {
    this.set('newPostMessage', null);
    this.set('newPostAlbum', null);
    this.set('newPostPhotos', []);
    this.trigger('clearNewPost');
  },

  actions: {
    create: function () {
      var postProps = {
        message: this.get('newPostMessage'),
        photo_ids: this.newPostPhotoIds(),
        album_id: this.get('newPostAlbum.id')
      };

      this.send('createPost', postProps);
    },

    addAlbum: function () {
      this.send('openModal', 'groupAlbumPicker');
    },

    addPhotos: function () {
      this.send('openModal', 'groupPhotoPicker');
    },

    removePhoto: function (photo) {
      this.get('newPostPhotos').removeObject(photo);
    },

    removeAlbum: function (album) {
      this.set('newPostAlbum', null);
    }
  }
});
