Ember.TextArea.reopen({
    // prevents left/right/esc actions from being triggered while editing within single photo view
  keyDown: Utils.stopControlKeyPropagation
});

Ember.TextField.reopen({
  keyDown: Utils.stopControlKeyPropagation
});