App.ConversationInvitation = Ember.Model.extend({
  id: Ember.attr(Number),
  conversation_id: Ember.attr(Number),
  conversation_preview: Ember.attr(),
  token: Ember.attr()
});

App.ConversationInvitation.url = 'conversation_invitations';
App.ConversationInvitation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
