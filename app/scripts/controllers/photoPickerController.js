//= require selectableMixin
App.PhotoPickerController = Ember.Controller.extend(Ember.Evented, App.SelectableMixin, {
  needs: ['photosPicker'],
  photosPicker: Ember.computed.alias('controllers.photosPicker'),
  activeTab: 'photosPicker',
  selected: Ember.computed.alias('photosPicker.selected'),

  clearSelected: function () {
    this.resetSelected();
  },

  // This is repetitive, but there's no way to dynamically render like this: {{render dynamicName}}.
  // I could use {{outlet}}, but then I have to push logic into ApplicationRoute. Bleh.
  photosPickerIsActive: function () {
    return this.get('activeTab') === 'photosPicker';
  }.property('activeTab'),

  albumsPickerIsActive: function () {
    return this.get('activeTab') === 'albumsPicker';
  }.property('activeTab'),

  uploadPickerIsActive: function () {
    return this.get('activeTab') === 'uploadPicker';
  }.property('activeTab'),

  reset: function () {
    this.resetSelected();
  },

  actions: {
    close: function () {
      this.send('closeModal');
    },

    add: function () {
      this.trigger('photosAdded', this.get('selectedIds'));
      this.send('close');
    },

    changeTab: function (tab) {
      this.set('activeTab', tab);
    },

    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.toggleSelected(photoController.get('model.id'), newValue);
    }
  }
});