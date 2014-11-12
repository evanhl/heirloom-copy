App.ConversationsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, {
  needs: ['application'],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),
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

  handleEmptyState: function () {
    if (this.get('currentPath') === 'conversations.index') {
      this.send('create');
    }
  },

  actions: {
    create: function () {
      this.trigger('enterCreateMode');
      this.transitionToRoute('conversations.create');
    }
  }
});