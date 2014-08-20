App.PhotoGroupingsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  init: function () {
    this.set('selected', {});
    this._super();
  },

  reset: function () {
    this.set('model', []);
    this._super();
  },

  fetchPage: function (page, perPage) {
    var self = this;

    return App.PhotoGrouping.fetchQuery({
      grouped_by: 'created_at',
      page: page,
      // TODO: this is a hack until we have a pagination UI design
      photos_per_page: 1000
    });
  },

  toggleSelected: function (photo, isSelected) {
    if (isSelected) {
      this.get('selected')[photo.get('id')] = true;
    } else {
      delete this.get('selected')[photo.get('id')];
    }
    this.notifyPropertyChange('selected');
  },

  selectedCount: function () {
    return Object.keys(this.get('selected')).length;
  }.property('selected'),

  isSelectionMode: function () {
    return this.get('selectedCount') > 0;
  }.property('selectedCount')
});