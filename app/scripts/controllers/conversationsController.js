App.ConversationsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  newConversationName: null,

  fetchPage: function (page, perPage) {
    var self = this;

    return App.Conversation.fetchQuery({
      page: page,
      per_page: perPage
    });
  },

  reset: function () {
    this.set('model', []);
    this._super();
  },

  actions: {
    create: function () {
      this.transitionToRoute('conversations.create');
    }
  }
});