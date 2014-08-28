App.PhotoPickerModalController = Ember.Controller.extend(Ember.Evented, {
  init: function () {
    this.resetSelected();
  },

  resetSelected: function () {
    this.set('selected', {});
  },

  toggleSelected: function (id, isSelected) {
    if (isSelected) {
      // We have to include photo and grouping here so that we can remove the photo from the grouping on delete
      this.get('selected')[id] = true;
    } else {
      delete this.get('selected')[id];
    }
    this.notifyPropertyChange('selected');
  },

  selectedIds: function () {
    return Object.keys(this.get('selected'));
  }.property('selected'),

  selectedCount: function () {
    return this.get('selectedIds').length;
  }.property('selectedIds'),

  noneSelected: function () {
    return this.get('selectedCount') === 0;
  }.property('selectedCount'),

  completeDisabled: function () {
    return this.get('noneSelected') || !this.get('name');
  }.property('noneSelected', 'name'),

  actions: {
    close: function () {
      this.resetSelected();
      this.send('closeModal');
    },

    // TODO: convert this to a component so that 'needs' and Evented are not necessary. Use actions instead.
    // TODO: Only reset & closeModal on successful operation by parentController (e.g. added photos to album)
    complete: function () {
      this.trigger('photosSelected', this.get('selectedIds'));
      this.resetSelected();
      this.send('closeModal');
    },

    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.toggleSelected(photoController.get('model.id'), newValue);
    }
  }
});
