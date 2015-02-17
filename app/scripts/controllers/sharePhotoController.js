//= require basePhotoController
App.SharePhotoController = App.BasePhotoController.extend({
  needs: ['share'],
  photos: Ember.computed.alias('controllers.share'),
  photosModel: Ember.computed.alias('photos.photos'),
  metadataDisabled: true,

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('sharePhoto', this.get('controllers.share.id'), toId);
  },

  // no need to detect we are close to last photo because share photos are not paginated
  photosUntilEndChanged: function () {},

  actions: {
    toCollection: function () {
      this.transitionToRoute('share', this.get('controllers.share.id'));
    }
  }
});
