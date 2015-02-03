//= require searchComponent

App.TagSearchComponent = App.SearchComponent.extend({
  hidden: Ember.computed.alias('isSelectedMode'),

  init: function () {
    this._super();
    this.set('selected', []);
  },

  onModeChange: function () {
    console.log('mode', this.get('mode'));
  }.observes('mode'),

  select2Args: function () {
    var self = this;

    return {
      minimumInputLength: 0,
      // We want to manage choices outside of Select2, so we don't need its multiple choice functionality
      multiple: false,
      ajax: {
        url: HLConfig.HOSTNAME + '/me/tags',
        dataType: 'json',
        data: function (term, page) {
          return {
            q: term
          };
        },
        results: function (results, page) {
          // parse the results into the format expected by Select2.
          results.forEach(function (result) {
            result.text = result.name;
            // setting id = name allows Select2 to remove the user-created choice if it's a duplicate
            result.id = result.name;
          });

          results = self.filterSelected(results);

          self.get('$select2').data('results', results);

          return { results: results };
        },
      },
      formatSelection: function (selection) {
        return selection.name;
      },
      createSearchChoice: function (term) {
        return {
          name: term,
          text: term,
          id: term,
          custom: true
        };
      }
    };
  }.property(),

  filterSelected: function (results) {
    var selected = this.get('selected');

    return results.filter(function (result) {
      return !selected.contains(result.name);
    });
  },

  onSelect: function () {
    var results = this.get('$select2').data('results');
    var selectedId = this.get('$select2').val();
    var selected = results.find(function (result) {
      // I know what I'm doing, JSHint!
      /* jshint eqeqeq:false */
      return result.id == selectedId;
      /* jshint eqeqeq:true */
    });

    this.addTag(selected.name);
    this.clearInput();
    this.get('$searchInput').focus();
    this.set('mode', 'open');
  },

  addTag: function (tagName) {
    if (!this.get('selected').contains(tagName)) {
      this.get('selected').pushObject(tagName);
    }
  },

  selectedChanged: function () {
    this.sendAction('action', this.get('selected'));
  }.observes('selected.[]'),

  // let's wait until a key is pressed before we go into search mode
  onSearchInputFocus: function () {},

  onFocusOut: function () {
    this.clearInput();
    this.set('mode', 'open');
  },

  keyDown: function () {
    this.set('mode', 'search');
  },

  actions: {
    remove: function (tagName) {
      this.get('selected').removeObject(tagName);
    }
  }
});