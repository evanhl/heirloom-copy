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

  isAndroidOrIos: function () {
    return Utils.isAndroid() || Utils.isIos();
  }.property(),

  isAndroid: function () {
    return Utils.isAndroid();
  }.property(),

  isIos: function () {
    return Utils.isIos();
  }.property(),

  iosStoreLink: function () {
    return Utils.IOS_STORE_LINK;
  }.property(),

  androidStoreLink: function () {
    return Utils.ANDROID_STORE_LINK;
  }.property(),

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
      if (!this.get('isAndroidOrIos')) {
        this.transitionToRoute('conversationPosts', this.get('conversation_id'));
      }
    } else {
      App.set('invitationToken', this.get('token'));
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
