//= require registerableMixin

App.LocationSearchComponent = Ember.Component.extend(App.RegisterableMixin, {
  mode: 'search',

  isSearchMode: Ember.computed.equal('mode', 'search'),
  isSelectedMode: Ember.computed.equal('mode', 'selected'),

  init: function () {
    this._super();
  },

  didInsertElement: function () {
    var self = this;
    var locService = App.get('locationSearch');

    this.$('.loc-search').select2({
      minimumInputLength: 1,
      multiple: false,
      query: function (query) {

        var self = this;

        locService.search(query.term, function (results) {
          $(self.element).data('results', results);
          query.callback({ results: results });
        });
      }
    }).on('change', function (e) {
      var $input = $(this);
      var results = $input.data('results');
      var selected = results.findBy('id', $(this).val());

      locService.getLatLng(selected.id, function (latLng) {
        if (!latLng) { return; }

        selected = $.extend({ name: selected.text }, latLng);

        self.set('selected', selected);
        self.set('mode', 'selected');
        self.sendAction('action', selected);
      });
    });
  },

  enterAndFocus: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.loc-search .select2-search input').focus();
    });
  }
});