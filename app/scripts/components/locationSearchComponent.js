App.LocationSearchComponent = Ember.Component.extend({
  init: function () {
    this._super();

  },

  didInsertElement: function () {
    var self = this;

    this.$('input').select2({
      minimumInputLength: 1,
      multiple: false,
      query: function (query) {
        var locService = App.get('locationSearch');

        locService.search(query.term, function (results) {
          query.callback({ results: results });
        });
      }
    });
    this.$('input').on('change');
  }
});