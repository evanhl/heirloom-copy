App.FuzzyDate = Ember.Object.extend({
  hasYear: false,
  hasMonth: false,
  hasDay: false,
  date: null,

  toJSON: function () {
    var dateString = '';

    if (this.get('hasYear')) {
      dateString += this.get('date').format('YYYY');
    }

    if (this.get('hasMonth')) {
      dateString += this.get('date').format('-MM');
    }

    if (this.get('hasDay')) {
      dateString += this.get('date').format('-DD');
    }

    return dateString;
  }
});

App.FuzzyDate.reopenClass({
  deserialize: function (dateString) {
    if (!dateString) { return; }

    if (dateString.match(/^\d{4}$/)) {
      return App.FuzzyDate.create({
        date: moment(dateString, 'YYYY'),
        hasYear: true
      });
    } else if (dateString.match(/^\d{4}-\d{2}$/)) {
      return App.FuzzyDate.create({
        date: moment(dateString, 'YYYY-MM'),
        hasYear: true,
        hasMonth: true
      });
    } else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return App.FuzzyDate.create({
        date: moment(dateString, 'YYYY-MM-DD'),
        hasYear: true,
        hasMonth: true,
        hasDay: true
      });
    }
  },

  serialize: function (fuzzyDate) {
    if (!fuzzyDate) { return; }

    return fuzzyDate.toJSON();
  }
});