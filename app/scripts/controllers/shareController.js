App.ShareController = Ember.ObjectController.extend(Ember.Evented, {
  shiftRightIndex: 0,
  maxVisiblePhotos: 4,
  shiftIncrement: 3,

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  isLoggedOut: function () {
    return !this.get('isLoggedIn');
  }.property('isLoggedIn'),

  isAndroidOrIos: function () {
    return Utils.isIos() || Utils.isAndroid();
  }.property(),

  shiftPhotos: function (offset) {
    var newIndex = this.get('shiftRightIndex') + offset;
    newIndex = Math.max(0, newIndex);
    newIndex = Math.min(newIndex, this.get('maxShiftIndex'));

    this.set('shiftRightIndex', newIndex);
  },

  maxShiftIndex: function () {
    return Math.max(0, this.get('photos.length') - this.get('maxVisiblePhotos'));
  }.property('maxVisiblePhotos', 'photos.length'),

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