App.ConversationInvitationController = Ember.ObjectController.extend({
  initials: function () {
    return Utils.getInitials(this.get('conversation_preview.owner.name'));
  }.property('conversation_preview'),

  invitee: Ember.computed.alias('conversation_preview.owner.name'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  doInvitationSetup: function () {
    var invitation = this.get('model');

    if (invitation.get('isLoaded')) {
      this.invitationLoaded();
    } else {
      invitation.one('didLoad', $.proxy(this.invitationLoaded, this));
    }
  },

  invitationLoaded: function () {
    var adapter = App.ConversationInvitation.adapter;
    var self = this;
    var invitation = this.get('model');

    if (this.get('policy.can_accept')) {
      adapter.postNested(invitation, {}, 'accept').then(function () {
        Ember.run.next(self, function () {
          this.transitionToRoute('conversationPosts', this.get('conversation_id'));
        });
      });
    } else if (this.get('isLoggedIn')) {
      this.transitionToRoute('conversationPosts', this.get('conversation_id'));
    } else {
      App.set('invitationToken', this.get('token'));
    }
  },

  actions: {
    signIn: function () {
      this.transitionToRoute('signin');
    },

    signUp: function () {
      this.transitionToRoute('registration');
    }
  }
});
