App.AlbumPickerView = Ember.View.extend({
  fetchFirstPage: function () {
    this.controller.fetchFirstPage();
  }.on('didInsertElement'),

  isCreateModeChanged: function () {
    var $input;

    if (this.get('controller.isCreateMode') && $input) {
      $input.focus();
    }
  }.observes('controller.isCreateMode'),

  keyPress: function (e) {
    if (this.get('cantComplete')) {
      return;
    }

    if (e.keyCode === Utils.Keys.ENTER) {
      this.controller.send('complete');
    }
  }
});
