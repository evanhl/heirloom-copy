Ember.TextArea.reopen({
  keyDown: function (e) {
    // prevents left/right/esc actions from being triggered while editing within single photo view
    switch (e.keyCode) {
      case Utils.Keys.ESC:
      case Utils.Keys.LEFT:
      case Utils.Keys.RIGHT:
        e.stopPropagation();
        break;
    }
  }
});

Ember.TextField.reopen({
  keyDown: function (e) {
    // prevents left/right/esc actions from being triggered while editing within single photo view
    switch (e.keyCode) {
      case Utils.Keys.ESC:
      case Utils.Keys.LEFT:
      case Utils.Keys.RIGHT:
        e.stopPropagation();
        break;
    }
  }
});