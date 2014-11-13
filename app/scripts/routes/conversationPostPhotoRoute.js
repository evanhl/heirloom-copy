App.ConversationPostPhotoRoute = Ember.Route.extend({
  model: function (params) {
    var photoId = params.photo_id.split('-')[1];

    return App.PostPhoto.find(params.photo_id);
  }
});
