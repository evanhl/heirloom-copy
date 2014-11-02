App.Conversation = Ember.Model.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  owner: Ember.belongsTo(App.Session, { key: 'owner', embedded: true }),
  is_owner: Ember.attr(Boolean),
  policy: Ember.attr(),
  has_unread: Ember.attr(Boolean),
  last_post_at: Ember.attr(Date),
  created_at: Ember.attr(Date),
  updated_at: Ember.attr(Date),
  member_count: 0
});

App.Conversation.url = 'conversations';
App.Conversation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
