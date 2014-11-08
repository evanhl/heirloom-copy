App.ConversationsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, {
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
      this.trigger('enterCreateMode');
      this.transitionToRoute('conversations.create');
    }
  }
});