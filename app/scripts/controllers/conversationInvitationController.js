App.ConversationInvitationController = Ember.ObjectController.extend({
  initials: function () {
    return Utils.getInitials(this.get('conversation_preview.owner.name'));
  }.property('conversation_preview'),

  invitee: Ember.computed.alias('conversation_preview.owner.name'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  modelChanged: function () {
    var adapter = App.ConversationInvitation.adapter;
    var self = this;
    var invitation = this.get('model');

    invitation.one('didLoad', function () {
      if (self.get('policy.can_accept')) {
        adapter.postNested(invitation, {}, 'accept').then(function () {
          Ember.run.next(self, function () {
            self.transitionToRoute('conversationPosts', self.get('conversation_id'));
          });
        });
      } else if (this.get('isLoggedIn')) {
        self.transitionToRoute('conversationPosts', self.get('conversation_id'));
      } else {
        localStorage.setItem('invitationToken', self.get('token'));
      }
    });
  }.observes('model'),

  actions: {
    signIn: function () {
      this.transitionToRoute('signin');
    },

    signUp: function () {
      this.transitionToRoute('registration');
    }
  }
});
