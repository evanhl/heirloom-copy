//= require registerableMixin
//= require ../views/bodyFocusOutMixin

App.SearchComponent = Ember.Component.extend(App.RegisterableMixin, App.BodyFocusOutMixin, {
  mode: 'open',

  // User can search
  isSearchMode: Ember.computed.equal('mode', 'search'),

  // Input is disabled. Used while saving.
  isSelectedMode: Ember.computed.equal('mode', 'selected'),

  // Input is displayed as enabled, but user is not actively searching
  isOpenMode: Ember.computed.equal('mode', 'open'),

  hidden: Ember.computed.alias('isSelectedMode'),

  init: function () {
    this._super();
    Utils.bindMethods(this, ['onSearchInputFocus']);
  },

  reset: function () {
    this.set('mode', 'open');
    this.clearInput();
  },

  clearInput: function () {
    this.get('$searchInput').val('');
    this.forceSearchChange();
  },

  didInsertElement: function () {
    var $select2 = this.$('.search').select2(this.get('select2Args'));

    this.addOverrides($select2);

    this.set('$select2', $select2);
    this.set('$searchInput', this.$('.search .select2-search input'));

    this.get('$searchInput').focus(this.onSearchInputFocus);
  },

  onSearchInputFocus: function () {
    this.set('mode', 'search');
  },

  addOverrides: function ($select2) {
    var select2 = $select2.data('select2');
    var origOnSelect = select2.onSelect;
    var self = this;

    select2.onSelect = function () {
      origOnSelect.apply(select2, arguments);
      self.onSelect.apply(self, arguments);
    };
  },

  keyDown: Utils.stopControlKeyPropagation,

  onSelect: function () {},

  forceSearchChange: function () {
    this.get('$searchInput').trigger('keyup-change');
  },

  setSelected: function (selected) {
    this.set('mode', 'selected');
    this.set('selected', selected);
    this.sendAction('action', selected);
  }
});