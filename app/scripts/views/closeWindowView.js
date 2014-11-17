App.CloseWindowView = Ember.View.extend({
  didInsertElement: function () {
    window.close();
  }
});