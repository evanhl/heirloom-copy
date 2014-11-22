App.SharePhotoRoute = Ember.Route.extend({
  model: function (params) {
    return App.Photo.fetch(params.photo_id);
  }
});
