Ember.TextArea.reopen({
  keyDown: function (e) {
    // prevents left/right/esc actions from being triggered while editing within single photo view
    e.stopPropagation();
  }
});

Ember.TextField.reopen({
  keyDown: function (e) {
    // prevents left/right/esc actions from being triggered while editing within single photo view
    e.stopPropagation();
  }
});