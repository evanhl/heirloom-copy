App.DownloadableMixin = Ember.Mixin.create({
  onEnterSelectionMode: function () {
    this._super();
    App.DropboxLoader.create().load();
  },

  doZipDownload: function () {
    var assembly;
    var urls = this.get('selectedIds').map(function (photoId) {
      return App.Photo.find(photoId).get('fullVersion');
    });

    assembly = App.ZipAssembly.create({
      urls: urls
    });

    this.set('zipAssembly', assembly);
    this.send('openModal', 'zipDownloadModal', assembly);
  },

  actions: {
    dropboxDownload: function () {
      var self = this;
      var urls = this.get('selectedIds').map(function (photoId) {
        return {
          url: App.Photo.find(photoId).get('fullVersion'),
          filename: photoId + '.jpg'
        };
      });

      App.DropboxLauncher.launch(urls, function () {
        self.trigger('toast', 'dropbox.error', null, 'toast-error');
      });
    },

    zipDownload: function () {
      this.doZipDownload();
    },

    toggleDownload: function () {
      this.get('downloadMenu').toggle();
    }
  }
});
