App.ModalDialogComponent = Ember.Component.extend({
  classNames: ['lightbox'],
  tagName: 'section',

  setFocus: function() {
    // brings the view into focus in order to capture keyDown events.
    this.$().attr({ tabindex: 1 }).focus();
  }.on('didInsertElement'),

  click: function (e) {
    if (!$(e.target).is(this.$())) {
      return;
    }

    this.sendAction();
  },

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.ESC) {
      this.sendAction();
    }
  }
});
