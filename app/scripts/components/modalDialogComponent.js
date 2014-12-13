App.ModalDialogComponent = Ember.Component.extend({
  classNames: ['lightbox'],
  classNameBindings: ['transparent'],
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
    // FIXME: wizard-container here pertains only to photosEmpty.hbs. This component needn't know about it.
    if (!$(e.target).is(this.$()) && !$(e.target).is(this.$('.wizard-container'))) {
      return;
    }

    this.sendAction();
  },

  touchEnd: function (e) {
    return this.click(e);
  },

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.ESC) {
      this.sendAction();
    }
  }
});
