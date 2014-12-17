App.ShareController = Ember.ObjectController.extend(Ember.Evented, {
  shiftRightIndex: 0,
  numVisiblePhotos: 4,
  isAddSuccess: false,

  canAdd: function () {
    return this.get('photo.policy.can_add') && this.get('isLoggedIn');
  }.property('photo.policy.can_add', 'isLoggedIn'),

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
    },

    save: function () {
      var self = this;
      var share = this.get('model');

      share.add().then(function () {
        self.set('isAddSuccess', true);
      }, function () {
        // TODO: handle failure
      });
    }
  }
});