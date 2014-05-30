App.PhotoController = Ember.ObjectController.extend({
  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('photo', toId);
  },
  actions: {
    prevPhoto: function () {
      this.toPhoto(this.get('prevId'));
    },
    nextPhoto: function () {
      this.toPhoto(this.get('nextId'));
    },
    toCollection: function () {
      this.transitionToRoute('photos');
    }
  }
});

