App.ChangePasswordView = Ember.View.extend({
  keyPress: function (e) {
    if (e.keyCode === Utils.Keys.ENTER) {
      this.controller.send('changePassword');
      e.preventDefault();
    }
  }
});