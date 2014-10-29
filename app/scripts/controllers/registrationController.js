App.RegistrationController = Ember.ObjectController.extend(App.FbControllerMixin, {
  email: null,
  name: null,
  username: null,
  password: null,
  error: {},

  hasInvitation: function () {
    return App.get("invitationToken");
  }.property('App.invitationToken'),

  actions: {
    signup: function () {
      var registration = this.getProperties(['name', 'email', 'username', 'password']);
      var record = App.Registration.create(registration);
      var self = this;

      record.save().then(function (session) {
        App.set('auth.currentSession', session);

        if (App.get('invitationToken')) {
          self.transitionToRoute('conversationInvitation', App.get('invitationToken'));
        } else {
          self.transitionToRoute('photos');
        }

        App.set('invitationToken', null);
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('error', response.responseJSON);
        }
      });
    },

    fbSignup: function () {
      App.get('facebook').attemptLogin();
    }
  }
});

// TODO: DRY up registration.hbs template by creating helper templates for input+error blocks