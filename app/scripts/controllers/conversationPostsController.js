App.ConversationPostsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['conversation', 'navigation'],
  conversation: Ember.computed.alias('controllers.conversation'),
  navigation: Ember.computed.alias('controllers.navigation'),
  newPostMessage: null,

  fetchPage: function (page, perPage) {
    // TODO: remove copypasta with AlbumPhotosController
    var adapter = App.Post.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Post, _query: params, container: false });

    if (page === 1) {
      this.onFirstPage();
    }

    return adapter.findNestedQuery(this.get('conversation.model'), App.Post, 'posts', records, params);
  },

  onFirstPage: function () {
    var adapter = App.Conversation.adapter;
    var self = this;
    var convo = this.get('conversation.model');

    adapter.postNested(convo, {}, 'read').then(function () {
      self.get('navigation').updateConversationsCount();
      convo.reload();
    });
  }
});
