App.BasePhotoController = Ember.ObjectController.extend(Ember.Evented, {
  loadingImg: false,
  firstSlot: false,
  showMetadata: true,

  init: function () {
    this._super();

    // observes only fires on a computed property if get has been called on it at least once
    this.get('photosUntilEnd');
  },

  largeVersionChanged: function () {
    var properties;

    if (!this.get('largeVersion')) {
      return;
    }

    this.toggleProperty('firstSlot');
  }.observes('largeVersion'),

  firstState: function () {
    var state = {};

    state.visible = this.get('firstSlot');
    state.src = this.get('firstSlot') ? this.get('largeVersion') : null;
    state.photo = this.get('firstSlot') ? this.get('model') : null;

    return state;
  }.property('firstSlot'),

  secondState: function () {
    var state = {};

    state.visible = !this.get('firstSlot');
    state.src = this.get('firstSlot') ? null : this.get('largeVersion');
    state.photo = this.get('firstSlot') ? null : this.get('model');

    return state;
  }.property('firstSlot'),

  adjacentId: function (offset) {
    var photo = this.adjacentPhoto(offset);

    return photo && photo.get('id');
  },

  adjacentPhoto: function (offset) {
    var index = this.get('currentIndex');
    var adjacentIndex = index + offset;

    if (adjacentIndex < 0 || adjacentIndex >= this.get('photosModel.length')) {
      return null;
    }

    return this.get('photosModel').objectAt(adjacentIndex);
  },

  // TODO: find better traversal solution.
  // This Stack post describes the problem: http://stackoverflow.com/questions/15072718/
  currentIndex: function () {
    var photoId = this.get('model.id');

    var index = Utils.findIndexOf(this.get('photosModel'), function (photo) {
      return photo.get('id') === photoId;
    });

    if (index !== -1) {
      return index;
    }
  }.property('photosModel', 'photosModel.[]', 'model'),

  prevId: function () {
    return this.adjacentId(-1);
  }.property('photosModel', 'photosModel.[]', 'id'),

  nextId: function () {
    return this.adjacentId(1);
  }.property('photosModel', 'photosModel.[]', 'id'),

  nextNextImageUrl: function () {
    var photo = this.adjacentPhoto(2);

    return photo && photo.get('largeVersion');
  }.property('photosModel', 'photosModel.[]', 'id'),

  photosUntilEnd: function () {
    var photosLength = this.get('photosModel.length');
    var currentIndex = this.get('currentIndex');

    if (!Em.isNone(photosLength) && !Em.isNone(currentIndex)) {
      return photosLength - currentIndex - 1;
    }
  }.property('currentIndex'),

  photosUntilEndChanged: function () {
    var untilEnd = this.get('photosUntilEnd');
    var FETCH_THRESHOLD = 5;

    if (!Em.isNone(untilEnd) && untilEnd <= FETCH_THRESHOLD) {
      this.get('photos').send('getMore');
    }
  }.observes('photosUntilEnd'),

  actions: {
    prevPhoto: function () {
      this.toPhoto(this.get('prevId'));
      this.set('editingDescription', false);
    },

    nextPhoto: function () {
      this.toPhoto(this.get('nextId'));
      this.set('editingDescription', false);
    },

    toggleMetadata: function () {
      this.toggleProperty('showMetadata');
    },

    rotatePhoto: function () {
      this.get('model').set('rotationAngle', (this.get('model').get('rotationAngle') || 0) + 90);
    },

    confirmRotate: function () {
      var newRecipe = Utils.PhotoRecipe.createRotateRecipe(this.get('model.rotationAngle'));
      this.get('model').patch({ recipe: newRecipe });
    }
  }
});

