App.ConversationsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  newConversationName: null,

  fetchPage: function (page, perPage) {
    var self = this;

    return App.Conversation.fetchQuery({
      page: page,
      per_page: perPage
    });
  },

  actions: {
    create: function () {
      var self = this;
      var conversationProps = {
        name: this.get('newConversationName')
      };
      var convo = App.Conversation.create(conversationProps);

      convo.save().then(function () {
        self.pushObject(App.ModelProxy.create({
          content: convo
        }));
      }, function () {
        // TODO: handle failure
      });
    }
  }
});