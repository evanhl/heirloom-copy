App.DropboxLauncher = {
  launch: function (urls, error) {
    error = error || function () {};

    if (!window.Dropbox) {
      error();
    }

    var dropboxOpts = {};

    dropboxOpts.files = urls;

    dropboxOpts.error = function () {
      error();
    };

    Dropbox.save(dropboxOpts);
  },

};
