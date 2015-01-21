Ember.TextArea.reopen({
  focusOut: function (e) {
    this.sendAction('lostFocus');
  }
});
