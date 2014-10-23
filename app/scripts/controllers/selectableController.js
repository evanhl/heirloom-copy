App.SelectableController = Ember.ObjectController.extend({
  selected: false,

  isSelectionMode: Ember.computed.alias('parentController.areItemsSelectable'),

  init: function () {
    this.get('parentController').on('deselect', this, this.deselect);
    this._super();
  },

  deselect: function () {
    this.set('selected', false);
  },

  willDestroy: function () {
    this.get('parentController').off('deselect', this, this.deselect);
  },

  actions: {
    select: function () {
      this.toggleProperty('selected');
      this.get('parentController').send('select', this);
    },

    enlarge: function () {
      this.get('parentController').send('enlarge', this.get('id'));
    }
  }
});
