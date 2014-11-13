//= require photo
App.PostPhoto = App.Photo.extend({
  id: Ember.attr(String)
});

App.PostPhotoAdapter = App.APIAdapter.extend({
  find: function (record, id) {
    var photoId = id.split('-')[1];
    return this._super(record, photoId);
  }
});
App.PostPhoto.url = 'photos';
App.PostPhoto.adapter = App.PostPhotoAdapter.create({
  userNamespaced: true
});