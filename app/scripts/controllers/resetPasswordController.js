App.ResetPasswordController = Ember.Controller.extend({
  submitDisabled: function () {
    return !(this.get('password') && this.get('confirmPassword'));
  }.property('password', 'confirmPassword'),

  actions: {
    resetPassword: function () {
      var self = this;

      var data = {
        reset_password_token: this.get('token'),
        password: this.get('password'),
        password_confirmation: this.get('confirmPassword')
      };

      App.get('analytics').trackEvent('ResetPassword.Actions.submit');

      Utils.apiCall('/password', "PATCH", data, function () {
        self.transitionToRoute('resetPasswordSuccess');
      }, function (response) {
        // TODO: handle error
        var errors;
        try {
          errors = response.responseJSON.errors;
        } catch (e) { }
        self.set('errors', errors);
      });
    }
  }
});
