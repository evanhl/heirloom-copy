App.ConversationPostsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['conversation', 'navigation'],
  conversation: Ember.computed.alias('controllers.conversation'),
  conversationId: Ember.computed.alias('conversation.id'),
  navigation: Ember.computed.alias('controllers.navigation'),
  newPostMessage: null,

  fetchPage: function (page, perPage) {
    if (page === 1) {
      this.onFirstPage();
    }

    return this.get('conversation.model').fetchPostsPage(page, perPage);
  },

  onFirstPage: function () {
    this.markAsRead();
    this.fetchParticipants();
  },

  markAsRead: function () {
    var self = this;
    var convo = this.get('conversation.model');

    convo.markAsRead().then(function () {
      self.get('navigation').updateConversationsCount();
      convo.reload();
    });
  },

  fetchParticipants: function () {
    var self = this;

    this.get('conversation.model').fetchInvitations().then(function (invitations) {
      var participants = invitations.mapBy('recipient').compact();

      self.set('participants', participants);
    });
  },

  clearParticipants: function () {
    this.set('participants', []);
  }.observes('conversation.model'),

  actions: {
    createPost: function (options) {
      var self = this;
      var post = App.Post.create(options);
      var conversation = self.get('conversation.model');

      conversation.createPost(post).then(function () {
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
