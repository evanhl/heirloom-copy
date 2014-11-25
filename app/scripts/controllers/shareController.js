App.ShareController = Ember.ObjectController.extend(Ember.Evented, {
  shiftRightIndex: 0,
  numVisiblePhotos: 4,
  shiftIncrement: function () {
    return this.get('numVisiblePhotos') - 1;
  }.property('numVisiblePhotos'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  isLoggedOut: function () {
    return !this.get('isLoggedIn');
  }.property('isLoggedIn'),

  isAndroidOrIos: function () {
    return Utils.isIos() || Utils.isAndroid();
  }.property(),

  // TODO: move this logic into ShareView
  shiftPhotos: function (offset) {
    var newIndex = this.get('shiftRightIndex') + offset;
    newIndex = Math.max(0, newIndex);
    newIndex = Math.min(newIndex, this.get('maxShiftIndex'));

    this.set('shiftRightIndex', newIndex);
  },

  maxShiftIndex: function () {
    return Math.max(0, this.get('photos.length') - this.get('numVisiblePhotos'));
  }.property('numVisiblePhotos', 'photos.length'),

  actions: {
    pageLeft: function () {
      this.shiftPhotos(0 - this.get('shiftIncrement'));
    },

    pageRight: function () {
      this.shiftPhotos(this.get('shiftIncrement'));
    },

    enlarge: function (id) {
      this.transitionToRoute('sharePhoto', this.get('id'), id);
    }
  }
});