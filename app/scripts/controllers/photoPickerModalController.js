App.PhotoPickerModalController = Ember.Controller.extend({
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

  selectedCount: function () {
    return Object.keys(this.get('selected')).length;
  }.property('selected'),

  actions: {
    close: function () {
      this.resetSelected();
      this.send('closeModal');
    },

    complete: function () {
      this.resetSelected();
      this.send('closeModal');
    },

    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.toggleSelected(photoController.get('model.id'), newValue);
    }
  }
});
