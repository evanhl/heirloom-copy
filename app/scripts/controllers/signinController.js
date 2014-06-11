App.SigninController = Ember.ObjectController.extend({
  login: null,
  password: null,
  error: {},

  actions: {
    signin: function () {
      var login = this.getProperties(['login', 'password']);
      var record = this.store.createRecord('session', login);
      var self = this;

      record.save().then(function (session) {
        var token = session.get('authentication_token');

        App.set('currentSession', session);
        App.auth.set('authToken', token);

        self.transitionToRoute('photos');
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('error', response.responseJSON);
        }
      });
    }
  }
});
