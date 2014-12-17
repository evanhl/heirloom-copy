App.ConversationInvitationController = Ember.ObjectController.extend({
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

  isAndroidOrIos: function () {
    return Utils.isAndroid() || Utils.isIos();
  }.property(),

  invitationLoaded: function () {
    var self = this;
    var invitation = this.get('model');

    if (invitation.get('isInvalid')) {
      return;
    }

    if (this.get('isLoggedIn') && invitation.get('state') !== 'accepted') {
      invitation.accept().then(function () {
        Ember.run.next(self, function () {
          this.afterAccept();
        });
      });
    } else if (this.get('isLoggedIn')) {
      this.afterAccept();
    } else {
      App.set('invitationToken', this.get('token'));
    }
  },

  afterAccept: function () {
    if (!this.get('isAndroidOrIos')) {
      this.transitionToRoute('conversationPosts', this.get('conversation_id'));
    }
  },

  // TODO: find consistent way of implementing controller reset & destroy view events
  cleanup: function () {
    this.set('justSignedIn', false);
    this.set('justSignedUp', false);
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
