//= require user

App.ConversationInvitation = Ember.Model.extend({
  id: Ember.computed.alias('token'),
  name: Ember.attr(),
  contact_value: Ember.attr(),
  conversation_id: Ember.attr(Number),
  conversation_preview: Ember.attr(),
  token: Ember.attr(),
  state: Ember.attr(),
  policy: Ember.attr(),
  to: Ember.belongsTo(App.User, { key: 'to', embedded: true }),
  from: Ember.belongsTo(App.User, { key: 'from', embedded: true }),
  isInvalid: function () {
    return this.get('isLoaded') && !this.get('state');
  }.property('isLoaded', 'state'),

  recipient: function () {
    if (this.get('to')) {
      return this.get('to');
    } else {
      return App.PendingRecipient.create({ name: this.get('name') || this.get('contact_value') });
    }
  }.property('to', 'contact_value')
});

App.PendingRecipient = Ember.Object.extend({
  initials: function () {
    return Utils.getInitials(this.get('name'));
  }.property('name')
});

App.ConversationInvitation.url = 'conversation_invitations';
App.ConversationInvitation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
