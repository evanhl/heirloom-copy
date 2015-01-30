//= require searchComponent

App.TagSearchComponent = App.SearchComponent.extend({
  hidden: Ember.computed.alias('isSelectedMode'),

  init: function () {
    this._super();
    this.set('selected', []);
  },

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
  },

  addTag: function (tagName) {
    if (!this.get('selected').contains(tagName)) {
      this.get('selected').pushObject(tagName);
    }
  }

  // TODO: handle onFocusOut
  // TODO: handle enterAndFocus
});