App.ConversationPostsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['conversation', 'navigation'],
  conversation: Ember.computed.alias('controllers.conversation'),
  conversationId: Ember.computed.alias('conversation.id'),
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
    this.markAsRead();
    this.fetchParticipants();
  },

  markAsRead: function () {
    var adapter = App.Conversation.adapter;
    var self = this;
    var convo = this.get('conversation.model');

    adapter.postNested(convo, {}, 'read').then(function () {
      self.get('navigation').updateConversationsCount();
      convo.reload();
    });
  },

  fetchParticipants: function () {
    var self = this;
    var adapter = App.Conversation.adapter;
    var records = Ember.RecordArray.create({ modelClass: App.ConversationInvitation, _query: {}, container: false });

    return adapter.findNestedQuery(this.get('conversation.model'), App.ConversationInvitation, 'invitations', records, {}).then(function () {
      var participants = records.map(function (invitation) {
        return invitation.get('to');
      }).compact();

      self.set('participants', participants);
    });
  },

  clearParticipants: function () {
    this.set('participants', []);
  }.observes('conversation.model'),

  actions: {
    createPost: function (options) {
      var self = this;
      var adapter = App.Conversation.adapter;
      var post = App.Post.create(options);
      var conversation = self.get('conversation.model');

      adapter.createNestedRecord(conversation, post, 'posts').then(function () {
        self.unshiftObject(post);
        self.trigger('didCreatePost', post);
      }, function () {
        // TODO: handle failure
      });
    },

    enlarge: function (id) {
      this.transitionToRoute('conversationPostPhoto', id);
    }
  }
});
