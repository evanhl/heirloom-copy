App.SigninView = Ember.View.extend({
  didInsertElement: function () {
    this.$().find('input:first').focus();
  },

  keyPress: function (e) {
    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('signin');
    }
  }
});
