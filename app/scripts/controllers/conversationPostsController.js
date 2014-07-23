App.ConversationPostsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  needs: ['conversation', 'photoPicker'],
  conversation: Ember.computed.alias('controllers.conversation'),
  photoPicker: Ember.computed.alias('controllers.photoPicker'),
  newPostMessage: null,

  init: function () {
    var self = this;
    this.set('newPostPhotos', []);
    this.get('photoPicker').on('photosAdded', function (addedPhotos) {
      self.get('newPostPhotos').pushObjects(addedPhotos);
    });
    this._super();
  },

  fetchPage: function (page, perPage) {
    // TODO: remove copypasta with AlbumPhotosController
    var adapter = App.Post.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Post, _query: params, container: false });

    return adapter.findNestedQuery(this.get('conversation.model'), App.Post, 'posts', records, params);
  },

  newPostPhotoIds: function () {
    return this.get('newPostPhotos').map(function (photo) {
      return photo.get('id');
    });
  },

  actions: {
    create: function () {
      var adapter = App.Conversation.adapter;
      var self = this;
      var conversation = self.get('conversation.model');
      var postProps = {
        message: this.get('newPostMessage'),
        photo_ids: this.newPostPhotoIds()
      };
      var post = App.Post.create(postProps);

      adapter.createNestedRecord(conversation, post, 'posts').then(function () {
        self.unshiftObject(post);
        self.set('newPostMessage', null);
        self.set('newPostPhotos', []);
      }, function () {
        // TODO: handle failure
      });
    }
  }
});
