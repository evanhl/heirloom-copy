App.FuzzyDate = Ember.Object.extend({
  hasYear: false,
  hasMonth: false,
  hasDay: false,
  date: null,
  prettyDate: "",

  isBlank: Ember.computed.not('hasYear'),

  initDate: function () {
    if (!this.get('date')) {
      this.set('date', moment());
    }

    this.setPrettyDate();
  }.on('init'),

  setPrettyDate: function () {
    var prettyDate;

    if (this.get('hasDay')) {
      prettyDate = this.get('date').format('MMMM D, YYYY');
    } else if (this.get('hasMonth')) {
      prettyDate = this.get('date').format('MMMM YYYY');
    } else if (this.get('hasYear')) {
      prettyDate = this.get('date').format('YYYY');
    }

    this.set('prettyDate', prettyDate);
  },

  setYear: function (year) {
    if (Em.isBlank(year)) {
      this.set('hasYear', false);
    } else {
      this.set('hasYear', true);
      this.get('date').year(year);
    }

    this.setPrettyDate();
  },

  setMonth: function (month) {
    if (Em.isBlank(month)) {
      this.set('hasMonth', false);
    } else {
      this.set('hasMonth', true);
      this.get('date').month(month);
    }

    this.setPrettyDate();
  },

  setDay: function (day) {
    if (!day) {
      this.set('hasDay', false);
    } else {
      this.set('hasDay', true);
      this.get('date').date(day);
    }

    this.setPrettyDate();
  },

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
  },

  getErrors: function () {
    var errors = [];

    if (this.get('hasDay') && !this.get('hasYear')) {
      errors.push(this.constructor.Errors.MISSING_YEAR);
    } else if (this.get('hasDay') && this.get('hasYear') && !this.get('hasMonth')) {
      errors.push(this.constructor.Errors.MISSING_MONTH);
    }

    return errors;
  },

  isValid: function () {
    return !this.getErrors().length;
  }
});

App.FuzzyDate.reopenClass({
  deserialize: function (dateString) {
    if (!dateString) { return App.FuzzyDate.create(); }

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

App.FuzzyDate.Errors = {
  // these values could be anything, but let's make them i18n keys to make it easier to look up
  MISSING_MONTH: 'date.errors.missingMonth',
  MISSING_YEAR: 'date.errors.missingYear'
};