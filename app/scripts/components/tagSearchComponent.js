//= require searchComponent

App.TagSearchComponent = App.SearchComponent.extend({
  hidden: Ember.computed.alias('isSelectedMode'),

  init: function () {
    this._super();

    if (!this.get('selected')) {
      this.set('selected', []);
    }
  },

  didInsertElement: function () {
    var select2, $select2;
    var self = this;

    this._super();

    $select2 = this.get('$select2');
    select2 = $select2.data('select2');

    this.get('$searchInput').on('keyup-change', function () {
      self.set('mode', 'search');
    });

    this.get('$searchInput').on('keyup-change', function () {
      var result, results, term;

      term = $(this).val();

      if (!term) { return; }

      result = $('<li class="select2-result select2-highlighted"></li>').html($(this).val());
      results = [select2.opts.createSearchChoice(term)];
      result.data('select2-data', results[0]);
      $select2.data('results', results);
      select2.results.html(result);
    });

    this.get('$searchInput').focus(function () {
      $(this).attr('placeholder', Ember.I18n.t('photo.tags.placeholder'));
    });

    this.get('$searchInput').blur(function () {
      $(this).attr('placeholder', null);
    });
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
      this.sendAction('action', this.get('selected'));
    }
  },

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.ESC) {
      // close results tray
      this.set('mode', 'open');
    }

    this._super(e);
  },

  // let's wait until a key is pressed before we go into search mode
  onSearchInputFocus: function () {},

  onFocusOut: function () {
    this.get('$searchInput').val('');
    this.set('mode', 'open');
  },

  actions: {
    remove: function (tagName) {
      this.get('selected').removeObject(tagName);
      this.sendAction('action', this.get('selected'));
    }
  }
});