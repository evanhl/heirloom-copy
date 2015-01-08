App.BasePhotoController = Ember.ObjectController.extend({
  loadingImg: false,
  firstSlot: false,
  lastIndex: null,

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

  currentIndex: function () {
    var photoId = this.get('model.id');
    var index = Utils.findNearby(this.get('photosModel'), function (photo) {
      return photo.get('id') === photoId;
    }, this.get('lastIndex'));

    if (index !== -1) {
      return index;
    }
  }.property('photosModel', 'photosModel.[]', 'model'),

  // We can't access currentIndex from within currentIndex, so this stores the last value instead.
  setLastIndex: function () {
    this.set('lastIndex', this.get('currentIndex'));
  }.observes('currentIndex'),

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

  // TODO: Replace with photo's owner once available. For now we can assume photo owner == current user
  userName: function () {
    return App.get('auth.currentSession.name');
  }.property('App.auth.currentSession.name'),

  actions: {
    prevPhoto: function () {
      this.toPhoto(this.get('prevId'));
    },

    nextPhoto: function () {
      this.toPhoto(this.get('nextId'));
    }
  }
});

