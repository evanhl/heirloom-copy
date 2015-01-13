App.ChangePasswordController = Ember.Controller.extend({
  passwordsMatch: function () {
    return this.get('password') === this.get('passwordConfirm');
  }.property('password', 'passwordConfirm'),

  isFormBlank: function () {
    return !this.get('password') && !this.get('passwordConfirm');
  }.property('password', 'passwordConfirm'),

  changeDisabled: function () {
    return !this.get('passwordsMatch') || this.get('isFormBlank');
  }.property('passwordsMatch', 'isFormBlank'),

  reset: function () {
    this.set('password', null);
    this.set('passwordConfirm', null);
  },

  actions: {
    close: function (passwordSuccess) {
      this.reset();
      this.send('openModal', 'settings', { passwordSuccess: passwordSuccess });
    },

    changePassword: function () {
      var self = this;
      var registration;

      if (this.get('changeDisabled')) {
        return;
      }

      registration = App.Registration.create();

      this.set('waiting', true);
      this.set('errors', null);
      registration.patch(this.getProperties(['password'])).then(function () {
        self.send('close', true);
        self.set('waiting', false);
      }, function (response) {
        self.set('errors', Utils.parseErrorResponse(response));
        self.set('waiting', false);
      });
    }
  }
});
