App.FuzzyDate = Ember.Object.extend({
  hasYear: false,
  hasMonth: false,
  hasDay: false,
  date: function () {
    return moment();
  }.property(),

  setYear: function (year) {
    if (Em.isBlank(year)) {
      this.set('hasYear', false);
    } else {
      this.correctDayOverflow();
      this.set('hasYear', true);
      this.get('date').year(year);
    }
  },

  setMonth: function (month) {
    if (Em.isBlank(month)) {
      this.set('hasMonth', false);
    } else {
      this.correctDayOverflow();
      this.set('hasMonth', true);
      this.get('date').month(month);
    }
  },

  setDay: function (day) {
    if (!day) {
      this.set('hasDay', false);
    } else {
      this.set('hasDay', true);
      this.get('date').date(day);
    }
  },

  correctDayOverflow: function () {
    if (!this.get('hasDay')) {
      // every month has a 15th day
      this.get('date').date(15);
    }
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