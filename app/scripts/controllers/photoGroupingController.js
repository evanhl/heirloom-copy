App.PhotoGroupingController = Ember.ObjectController.extend(Ember.Evented, {
  init: function () {
    this.get('parentController').on('deselect', this, this.deselect);
    this._super();
  },

  deselect: function () {
    this.trigger('deselect');
  },

  willDestroy: function () {
    this.get('parentController').off('deselect', this, this.deselect);
  },

  actions: {
    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.get('parentController').toggleSelected(photoController.get('model'), this.get('model'), newValue);
    },

    enlarge: function (id) {
      this.transitionToRoute('photo', id);
    }
  }
});
