//= require selectableMixin
App.PhotoPickerModalController = Ember.Controller.extend(Ember.Evented, App.SelectableMixin, {
  init: function () {
    this.reset();
  },

  reset: function () {
    this.set('selected', {});
    this.set('name', null);
  },

  completeDisabled: function () {
    return this.get('noneSelected') || !this.get('name');
  }.property('noneSelected', 'name'),

  actions: {
    close: function () {
      this.reset();
      this.send('closeModal');
    },

    // TODO: convert this to a component so that 'needs' and Evented are not necessary. Use actions instead.
    // TODO: Only reset & closeModal on successful operation by parentController (e.g. added photos to album)
    complete: function () {
      this.trigger('photosSelected', this.get('selectedIds'));
      this.reset();
      this.send('closeModal');
    },

    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.toggleSelected(photoController.get('model.id'), newValue);
    }
  }
});
