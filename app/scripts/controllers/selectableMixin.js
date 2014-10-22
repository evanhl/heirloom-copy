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

  moreThanOneSelected: function () {
    return this.get('selectedCount') > 1;
  }.property('selectedCount'),

  isSelectionMode: function () {
    return this.get('selectedCount') > 0;
  }.property('selectedCount'),

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
