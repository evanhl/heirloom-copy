App.RegistrationController = Ember.ObjectController.extend(App.FbControllerMixin, {
  // TODO: reduce copypasta between this an SignInController
  needs: ['conversationInvitation'],
  conversationInvitation: Ember.computed.alias('controllers.conversationInvitation'),
  email: null,
  name: null,
  username: null,
  password: null,
  errors: {},

  FIELDS: ['name', 'email', 'username', 'password'],

  hasInvitation: function () {
    return App.get("invitationToken");
  }.property('App.invitationToken'),

  submitDisabled: function () {
    var self = this;

    return !this.FIELDS.every(function (fieldName) {
      return self.get(fieldName);
    });
  }.property('name', 'email', 'username', 'password'),

  actions: {
    signup: function () {
      if (this.get('submitDisabled')) { return; }

      var registration = this.getProperties(this.FIELDS);
      var record = App.Registration.create(registration);
      var self = this;

      this.set('errors', {});

      record.save().then(function (session) {
        App.set('auth.currentSession', session);

        if (App.get('invitationToken')) {
          self.set('conversationInvitation.justSignedUp', true);
          self.transitionToRoute('conversationInvitation', App.get('invitationToken'));
        } else {
          self.transitionToRoute('photos');
        }

        self.setProperties({
          name: null,
          email: null,
          username: null,
          password: null,
          errors: {}
        });

        App.set('invitationToken', null);
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('errors', response.responseJSON);
        }
      });
    },

    fbSignup: function () {
      App.get('facebook').attemptLogin();
    }
  }
});

// TODO: DRY up registration.hbs template by creating helper templates for input+error blocks