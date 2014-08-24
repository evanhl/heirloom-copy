App.PhotoGroupingController = Ember.ObjectController.extend({
  needs: ['photoGroupings'],
  photoGroupings: Ember.computed.alias('controllers.photoGroupings'),

  actions: {
    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.get('parentController').toggleSelected(photoController.get('model'), this.get('model'), newValue);
    }
  }
});
