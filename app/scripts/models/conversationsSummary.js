App.ConversationsSummary = Ember.Model.extend({
  unread_count: Ember.attr(Number),
  unread_count_plus: Ember.attr(Boolean)
});

App.ConversationsSummary.url = 'conversations_summary';
App.ConversationsSummary.adapter = App.APIAdapter.create({
  userNamespaced: true
});
