App.ConversationInvitation = Ember.Model.extend({
  id: Ember.attr(Number),
  conversation_id: Ember.attr(Number)
});

App.ConversationInvitation.url = 'conversation_invitations';
App.ConversationInvitation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
