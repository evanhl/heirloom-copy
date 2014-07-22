App.PhotoPickerController = Ember.Controller.extend(Ember.Evented, {
  needs: ['photosPicker'],
  photosPicker: Ember.computed.alias('controllers.photosPicker'),
  activeTab: 'photosPicker',
  selected: Ember.computed.alias('photosPicker.selected'),

  selectedCount: function () {
    return this.get('selected').length;
  }.property('selected.@each'),

  noneSelected: function () {
    return this.get('selectedCount') === 0;
  }.property('selectedCount'),

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

  actions: {
    close: function () {
      this.send('closeModal');
    },

    add: function () {
      this.trigger('photosAdded', this.get('selected'));
      this.send('close');
    },

    changeTab: function (tab) {
      this.set('activeTab', tab);
    }
  }
});