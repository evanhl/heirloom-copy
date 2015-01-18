App.SelectableMixin = Ember.Mixin.create({
  selectedIds: function () {
    return Object.keys(this.get('selected'));
  }.property('selected'),

  selectedCount: function () {
    return this.get('selectedIds').length;
  }.property('selectedIds'),

  noneSelected: function () {
    return this.get('selectedCount') === 0;
  }.property('selectedCount'),

  isSelectionMode: function () {
    return this.get('selectedCount') > 0;
  }.property('selectedCount'),

  selectionModeChanged: function () {
    this.set('lastSelectionMode', this.get('isSelectionMode'));
  }.observesBefore('isSelectionMode'),

  onSelectionMode: function () {
    if (this.get('isSelectionMode') && !this.get('lastSelectionMode')) {
      this.onEnterSelectionMode();
    }
  }.observes('isSelectionMode'),

  onEnterSelectionMode: function () {},

  areItemsSelectable: Ember.computed.alias('isSelectionMode'),

  resetSelected: function () {
    this.set('selected', {});
  }.on('init'),

  toggleSelected: function (id, isSelected, payload) {
    if (Ember.isNone(payload)) {
      payload = true;
    }

    if (isSelected) {
      this.get('selected')[id] = payload;
    } else {
      delete this.get('selected')[id];
    }
    this.notifyPropertyChange('selected');
  },
});
