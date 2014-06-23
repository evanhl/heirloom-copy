App.BasePhotoController = Ember.ObjectController.extend({
  loadingImg: false,
  firstSlot: false,

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

    return state;
  }.property('firstSlot'),

  secondState: function () {
    var state = {};

    state.visible = !this.get('firstSlot');
    state.src = this.get('firstSlot') ? null : this.get('largeVersion');

    return state;
  }.property('firstSlot'),

  // FIXME: add cached array position so this isn't O(n)
  adjacentId: function (offset) {
    var photo;
    var index = this.get('currentIndex');

    photo = this.get('photos.model')[index + offset];

    return photo && photo.get('id');
  },

  currentIndex: function () {
    var index = this.get('photos.model').indexOf(this.get('model'));

    if (index !== -1) {
      return index;
    }
  }.property('photos.model.length', 'model'),

  prevId: function () {
    return this.adjacentId(-1);
  }.property('photos.model.length', 'id'),

  nextId: function () {
    return this.adjacentId(1);
  }.property('photos.model.length', 'id'),

  photosUntilEnd: function () {
    var photosLength = this.get('photos.model.length');
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
    },

    nextPhoto: function () {
      this.toPhoto(this.get('nextId'));
    }
  }
});

