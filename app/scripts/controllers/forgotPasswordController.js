App.ForgotPasswordController = Ember.Controller.extend({
  isSuccessful: false,

  submitDisabled: function () {
    return !Utils.isProbablyAValidEmail(this.get('email'));
  }.property('email'),

  actions: {
    sendEmail: function () {
      var self = this;

      Utils.apiCall('/password', 'POST', { email: this.get('email') },
      function () {
        self.set('isSuccessful', true);
      },
      function (response) {
        if (response.responseJSON && response.responseJSON.errors) {
          self.set('errors', response.responseJSON.errors);
        }
      });
    }
  }
});
