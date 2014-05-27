/* globals App, Ember */

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