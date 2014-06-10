App.RegistrationController = Ember.ObjectController.extend({
  email: null,
  name: null,
  username: null,
  password: null,
  error: {},

  actions: {
    create: function () {
      var registration = this.getProperties(['name', 'email', 'username', 'password']);
      var record = this.store.createRecord('registration', registration);
      var self = this;

      record.save().then(function (registrationResponse) {
        var token = registrationResponse.get('authentication_token');

        App.httpHeaders['X-User-Token'] = token;
        localStorage.setItem('X-User-Token', token);

        self.transitionToRoute('photos');
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('error', response.responseJSON);
        }
      });
    }
  }
});

// TODO: DRY up registration.hbs template by creating helper templates for input+error blocks