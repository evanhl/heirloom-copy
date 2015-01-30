//= require registerableMixin
//= require searchComponent

App.LocationSearchComponent = App.SearchComponent.extend({
  mode: 'open',

  // User can search
  isSearchMode: Ember.computed.equal('mode', 'search'),

  // Input is disabled. Used while saving.
  isSelectedMode: Ember.computed.equal('mode', 'selected'),

  // Input is displayed as enabled, but user is not actively seraching
  isOpenMode: Ember.computed.equal('mode', 'open'),

  hidden: Ember.computed.alias('isSelectedMode'),

  onModeChange: function () {
    console.log('mode', this.get('mode'));
  }.observes('mode').on('init'),

  init: function () {
    this._super();
    Utils.bindMethods(this, ['onBodyClick']);
  },

  reset: function () {
    this.set('mode', 'open');
    this.get('$searchInput').val('');
    this.forceSearchChange();
  },

  keyDown: Utils.stopControlKeyPropagation,

  didInsertElement: function () {
    var self = this;
    var locService = App.get('locationSearch');

    var $select2 = this.$('.loc-search').select2({
      minimumInputLength: 2,
      multiple: false,
      query: function (query) {

        var self = this;

        locService.search(query.term, function (results) {
          $(self.element).data('results', results);
          query.callback({ results: results });
        });
      }
    });

    this.overrideOnSelect($select2);

    this.set('$select2', $select2);
    this.set('$searchInput', this.$('.loc-search .select2-search input'));

    this.get('$searchInput').focus(function () {
      self.set('mode', 'search');
    });
  },

  overrideOnSelect: function ($select2) {
    var select2 = $select2.data('select2');
    var origOnSelect = select2.onSelect;
    var self = this;

    select2.onSelect = function () {
      origOnSelect.apply(select2, arguments);
      self.onSelect.apply(self, arguments);
    };
  },

  onSelect: function () {
    var locService = App.get('locationSearch');
    var self = this;
    var results = this.get('$select2').data('results');
    var selected = results.findBy('id', this.get('$select2').val());

    if (!selected.id) { return; }

    locService.getLatLng(selected.id, function (latLng) {
      if (!latLng) { return; }

      selected = $.extend({ name: selected.text }, latLng);

      self.set('selected', selected);
      self.set('mode', 'selected');
      self.sendAction('action', selected);
    });
  },

  forceSearchChange: function () {
    this.get('$searchInput').trigger('keyup-change');
  },


  // TODO: body click handling is a really common pattern. This should be turned into a mixin
  registerBodyClick: function () {
    $('body').on('click', this.onBodyClick);
  }.on('didInsertElement'),

  unregisterBodyClick: function () {
    $('body').off('click', this.onBodyClick);
  }.on('willDestroyElement'),

  onBodyClick: function (e) {
    if (!$(e.target).closest(this.$()).length) {
      this.onFocusOut();
    }
  },

  onFocusOut: function () {
    if (!this.get('isSearchMode')) {
      return;
    }

    if (!this.get('$searchInput').val()) {
      // FIXME: change empty string to null once PATCH issue is fixed in the API
      this.set('mode', 'selected');
      this.set('selected', "");
      this.sendAction('action', "");
    } else {
      this.set('mode', 'open');
      this.sendAction('focus-out');
    }
  },

  enterAndFocus: function () {
    this.set('mode', 'search');

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $searchInput = this.get('$searchInput');

      this.$('.loc-search').select2('enable');
      $searchInput.focus();

      if (this.get('selected.name')) {
        $searchInput.val(this.get('selected.name'));
        $searchInput.select();
      }

      this.forceSearchChange();
    });
  }
});