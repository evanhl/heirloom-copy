App.ConversationInvitation = Ember.Model.extend({
  id: Ember.computed.alias('token'),
  conversation_id: Ember.attr(Number),
  conversation_preview: Ember.attr(),
  token: Ember.attr(),
  state: Ember.attr(),
  policy: Ember.attr(),
  isInvalid: function () {
    return this.get('isLoaded') && !this.get('state');
  }.property('isLoaded', 'state')
});

App.ConversationInvitation.url = 'conversation_invitations';
App.ConversationInvitation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
