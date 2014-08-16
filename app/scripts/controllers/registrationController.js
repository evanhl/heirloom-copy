App.RegistrationController = Ember.ObjectController.extend(App.FbControllerMixin, {
  email: null,
  name: null,
  username: null,
  password: null,
  error: {},

  actions: {
    signup: function () {
      var registration = this.getProperties(['name', 'email', 'username', 'password']);
      var record = App.Registration.create(registration);
      var self = this;

      record.save().then(function (session) {
        var sessionObj = Ember.Object.create(session.toJSON());
        App.set('auth.currentSession', sessionObj);

        self.transitionToRoute('photoGroupings');
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