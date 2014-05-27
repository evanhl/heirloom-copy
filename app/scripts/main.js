/* globals Dropzone, InfiniteScroll */

var App = Ember.Application.create({});

// TODO: conditionally enable push state based on browser support
// App.Router.reopen({
//   location: 'history'
// });

App.Router.map(function() {
  this.resource('photos');
  this.resource('albums');
  this.route('upload');
});

App.PhotosRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('photo', {
      page: 1,
      per_page: 4
    }).then(function (photos) {
      return photos.content;
    });;
  },

  // TODO: if we get empty results back, we're at max page
  actions: {
    getMore: function () {
      var controller = this.get('controller'),
          nextPage   = controller.get('page') + 1,
          perPage    = controller.get('perPage'),
          self       = this;

      this.store.find('photo', {
        page: nextPage,
        per_page: perPage
      }).then(function (photos) {
        self.get('controller').send('gotMore', photos.content, nextPage);
      });
    }
  }
});

App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, { perPage: 4 }, {

});

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});

// TODO: clean up view on destroy
App.UploadView = Ember.View.extend({
  didInsertElement: function () {
    var upload = new App.Upload.UploadToS3();
  }
});

Dropzone.autoDiscover = false;