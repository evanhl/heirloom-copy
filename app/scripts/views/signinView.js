App.SigninView = Ember.View.extend({
  keyPress: function (e) {
    var controller = this.get('controller');
    var ENTER_KEY = 13;

    if (e.keyCode === ENTER_KEY) {
      controller.send('signin');
    }
  }
});
