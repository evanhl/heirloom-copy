App.ConversationRoute = Ember.Route.extend({
  model: function (params) {
    return App.Conversation.fetch(params.conversation_id);
  }
});