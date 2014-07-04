App.ConversationPostsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
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
  },

  actions: {
    create: function () {
      var adapter = App.Conversation.adapter;
      var self = this;
      var conversation = self.get('conversation.model');
      var postProps = {
        message: this.get('newPostMessage')
      };
      var post = App.Post.create(postProps);

      adapter.saveNestedRecord(conversation, post, 'posts').then(function () {
        self.unshiftObject(App.ModelProxy.create({
          content: post
        }));
        self.set('newPostMessage', null);
      }, function () {
        // TODO: handle failure
      });
    }
  }
});
