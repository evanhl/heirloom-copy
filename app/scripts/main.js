/* globals Dropzone, InfiniteScroll */

var App = Ember.Application.create({});

// TODO: conditionally enable push state based on browser support
// App.Router.reopen({
//   location: 'history'
// });

// TODO: split this out into multiple files

App.Router.map(function() {
  this.resource('photos');
  this.resource('albums');
  this.route('upload');
});

App.PhotosRoute = Ember.Route.extend({
  model: function () {
    // return an empty array that the controller can append to as the user pages
    return [];
  },

  setupController: function(controller, model) {
    controller.send('getMore');
  }
});

// TODO: extract infinite scroll logic
App.PhotosController = Ember.ArrayController.extend({
  page: 0,
  perPage: 20,
  actions: {
    getMore: function () {
      if (this.get('loadingMore')) { return; }

      var nextPage   = this.get('page') + 1,
          perPage    = this.get('perPage'),
          self       = this;

      if (nextPage > this.get('maxPage')) { return; }

      this.set('loadingMore', true);

      this.store.find('photo', {
        page: nextPage,
        per_page: perPage
      }).then(function (photos) {
        // TODO: timeout is for demo only. remove.
        setTimeout(function () {
          self.send('gotMore', photos.content, nextPage);
        }, 2000);
      });
    },
    gotMore: function (items, nextPage) {
      this.set('loadingMore', false);

      if (items.length === 0) {
        this.set('maxPage', this.get('page'));
      }

      this.pushObjects(items);
      this.set('page', nextPage);
    }
  }
});

// TODO: make spinner show/hide less jerky
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