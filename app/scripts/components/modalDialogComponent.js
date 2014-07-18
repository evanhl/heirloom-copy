App.ModalDialogComponent = Ember.Component.extend({
  classNames: ['lightbox'],
  tagName: 'section',

  setFocus: function () {
    // brings the view into focus in order to capture keyDown events.
    this.$().attr({ tabindex: 1 }).focus();
  }.on('didInsertElement'),

  disableBodyScroll: function () {
    $('body').addClass('noscroll');
  }.on('didInsertElement'),

  enableBodyScroll: function () {
    $('body').removeClass('noscroll');
  }.on('willDestroyElement'),

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
