// TODO: clean up view on destroy
App.UploadModalView = Ember.View.extend({
  didInsertElement: function () {
    var self = this;

    Ember.run.schedule('afterRender', this, this.initDropzone);
  },

  initDropzone: function () {
    this.controller.initDropzone(this.$('.dropzone'));

    this.controller.off('addFakePhoto', this, this.addFakePhoto);
    this.controller.on('addFakePhoto', this, this.addFakePhoto);
  },

  addFakePhoto: function () {
    Ember.run.next(this, function () {
      var $el = this.$('.dropzone');
      var $fakePhoto = $('<div class="fake-photo"></div>');

      $fakePhoto.click(function () {
        $el.click();
      });
      $el.children('.fake-photo').remove();
      $el.append($fakePhoto);
    });
  },

  willDestroyElement: function () {
    this.controller.destroyDropzone(this.$('.dropzone'));
  }
});

Dropzone.autoDiscover = false;