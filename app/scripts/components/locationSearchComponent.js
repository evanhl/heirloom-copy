//= require searchComponent

App.LocationSearchComponent = App.SearchComponent.extend({
  select2Args: function () {
    var locService = App.get('locationSearch');

    return {
      minimumInputLength: 2,
      multiple: false,
      query: function (query) {

        var self = this;

        locService.search(query.term, function (results) {
          $(self.element).data('results', results);
          query.callback({ results: results });
        });
      }
    };
  }.property(),

  onSelect: function () {
    var locService = App.get('locationSearch');
    var self = this;
    var results = this.get('$select2').data('results');
    var selected = results.findBy('id', this.get('$select2').val());

    if (!selected.id) { return; }

    locService.getLatLng(selected.id, function (latLng) {
      if (!latLng) { return; }

      selected = $.extend({ name: selected.text }, latLng);

      self.setSelected(selected);
    });
  },

  onFocusOut: function () {
    if (!this.get('isSearchMode')) {
      return;
    }

    if (!this.get('$searchInput').val()) {
      // FIXME: change empty string to null once PATCH issue is fixed in the API
      this.setSelected('');
    } else {
      this.set('mode', 'open');
      this.sendAction('focus-out');
    }
  },

  enterAndFocus: function () {
    this.set('mode', 'search');

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $searchInput = this.get('$searchInput');

      this.$('.search').select2('enable');
      $searchInput.focus();

      if (this.get('selected.name')) {
        $searchInput.val(this.get('selected.name'));
        $searchInput.select();
      }

      this.forceSearchChange();
    });
  }
});