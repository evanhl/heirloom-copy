App.ModalDialogComponent = Ember.Component.extend({
  classNames: ['lightbox'],
  tagName: 'section',

  click: function () {
    this.sendAction();
  }
});
