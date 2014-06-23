App.RegistrationView = Ember.View.extend({
  didInsertElement: function () {
    this.$().find('input:first').focus();
  },

  keyPress: function (e) {
    var controller = this.get('controller');
    var ENTER_KEY = 13;

    if (e.keyCode === ENTER_KEY) {
      controller.send('create');
    }
  }
});
