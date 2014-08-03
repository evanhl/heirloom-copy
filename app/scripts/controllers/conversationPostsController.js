App.ConversationPostsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['conversation'],
  conversation: Ember.computed.alias('controllers.conversation'),
  newPostMessage: null,

  fetchPage: function (page, perPage) {
    // TODO: remove copypasta with AlbumPhotosController
    var adapter = App.Post.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Post, _query: params, container: false });

    return adapter.findNestedQuery(this.get('conversation.model'), App.Post, 'posts', records, params);
  }
});
