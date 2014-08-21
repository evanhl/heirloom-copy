App.PhotoGroupingController = Ember.ObjectController.extend({
  needs: ['photoGroupings'],
  photoGroupings: Ember.computed.alias('controllers.photoGroupings'),

  actions: {
    select: function (id) {
      var photo = this.get('photos').findBy('id', id);
      var newValue = photo.toggleProperty('selected');
      this.get('photoGroupings').toggleSelected(photo, this.get('model'), newValue);
    }
  }
});
