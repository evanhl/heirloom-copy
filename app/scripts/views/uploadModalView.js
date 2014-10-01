// TODO: clean up view on destroy
App.UploadModalView = Ember.View.extend({
  didInsertElement: function () {
    var self = this;

    Ember.run.schedule('afterRender', function () {
      self.controller.initDropzone(self.$('.dropzone'));
    });
  },

  willDestroyElement: function () {
    this.controller.destroyDropzone(this.$('.dropzone'));
  }
});

Dropzone.autoDiscover = false;