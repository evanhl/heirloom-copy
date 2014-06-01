App.PhotoController = Ember.ObjectController.extend({
  needs: ['photos'],
  photos: Ember.computed.alias("controllers.photos"),

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('photo', toId);
  },

  // FIXME: add cached array position so this isn't O(n)
  adjacentId: function (offset) {
    var photo;
    var index = this.get('photos.model').indexOf(this.get('model'));

    if (index === -1) {
      return;
    }

    photo = this.get('photos.model')[index + offset];

    return photo && photo.get('id');
  },

  prevId: function () {
    return this.adjacentId(-1);
  }.property('photos.model.length', 'id'),

  // TODO: add fetch when end of last page is hit
  nextId: function () {
    return this.adjacentId(1);
  }.property('photos.model.length', 'id'),

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

