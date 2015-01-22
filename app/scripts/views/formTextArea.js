App.FormTextAreaView = Ember.TextArea.extend({
  autosize: function () {
    this.$().autosize();
  }.on('didInsertElement')
});
