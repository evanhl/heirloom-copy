//= require hiddenNavMixin
//= require fixedElFixMixin
App.RegistrationView = Ember.View.extend(App.HiddenNavMixin, App.FixedElFixMixin, {
  didInsertElement: function () {
    this.$().find('input:first').focus();
  },

  keyPress: function (e) {
    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('signup');
    }
  }
});
