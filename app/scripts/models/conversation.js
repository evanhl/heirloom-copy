App.Conversation = Ember.Model.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  owner: Ember.attr(),
  is_owner: Ember.attr(Boolean),
  policy: Ember.attr(),
  member_count: 0
});

App.Conversation.url = 'conversations';
App.Conversation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
