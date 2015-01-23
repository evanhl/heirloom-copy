App.FuzzyDateComponent = Ember.Component.extend({
  classNames: ['form-line', 'fuzzy-date'],
  classNameBindings: ['mode'],

  init: function () {
    this._super();
    Utils.bindMethods(this, ['updateYear', 'updateMonth', 'updateDay', 'yearChanged', 'monthChanged', 'onBodyClick']);
  },

  updateYear: function () {
    var yearDate = this.$('.date-year').datepicker('getDate');
    var year;

    if (Utils.isValidDate(yearDate)) {
      year = moment(yearDate).year();
    } else {
      year = null;
    }

    this.get('date').setYear(year);
    this.updateDayPickerViewDate();
  },

  updateMonth: function () {
    var monthDate = this.$('.date-month').datepicker('getDate');
    var month;

    if (Utils.isValidDate(monthDate)) {
      month = moment(monthDate).month();
    } else {
      month = null;
    }

    this.get('date').setMonth(month);
    this.updateDayPickerViewDate();
  },

  updateDay: function () {
    var dayDate = this.$('.date-day').datepicker('getDate');
    var day;

    if (Utils.isValidDate(dayDate)) {
      day = moment(dayDate).date();
    } else {
      day = null;
    }

    this.get('date').setDay(day);
  },

  updateInputs: function () {
    if (this.get('date.hasYear')) {
      this.$('.date-year').datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$('.date-year').datepicker('setDate', null);
    }

    if (this.get('date.hasMonth')) {
      this.$('.date-month').datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$('.date-month').datepicker('setDate', null);
    }

    this.updateDayInput();
  },

  updateDayInput: function () {
    if (this.get('date.hasDay')) {
      this.$('.date-day').datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$('.date-day').datepicker('setDate', null);
    }
  },

  onBodyClick: function (e) {
    if (!$(e.target).is('.day,.month,.year') && !$(e.target).closest(this.$()).length) {
      this.sendAction('complete');
    }
  },

  dateModelChanged: function () {
    this.resetDayPickerViewDate();
    this.detachInputEvents();
    this.updateInputs();
    this.attachInputEvents();
  }.observes('date'),

  resetDayPickerViewDate: function () {
    this.$('.date-day').datepicker('setStartDate', null);
    this.$('.date-day').datepicker('setEndDate', null);
  },

  yearChanged: function () {
    Ember.run.next(this, function () {
      if (!this.$(':focus') || !this.$(':focus').length) {
        if (this.$('.date-month')) {
          this.$('.date-month').focus();
        }
      }
    });
  },

  monthChanged: function () {
    Ember.run.next(this, function () {
      if (!this.$(':focus') || !this.$(':focus').length) {
        if (this.$('.date-day')) {
          this.$('.date-day').focus();
        }
      }
    });
  },

  attachInputEvents: function () {
    $('body').on('click', this.onBodyClick);

    this.$('.date-year').on('changeDate', this.yearChanged);
    this.$('.date-month').on('changeDate', this.monthChanged);

    this.$('.date-year').on('change', this.updateYear);
    this.$('.date-month').on('change', this.updateMonth);
    this.$('.date-day').on('change', this.updateDay);
  },

  detachInputEvents: function () {
    $('body').off('click', this.onBodyClick);

    this.$('.date-year').off('changeDate', this.yearChanged);
    this.$('.date-month').off('changeDate', this.monthChanged);

    this.$('.date-year').off('change', this.updateYear);
    this.$('.date-month').off('change', this.updateMonth);
    this.$('.date-day').off('change', this.updateDay);
  },

  updateDayPickerViewDate: function () {
    var fuzzyDateMoment = this.get('date.date');

    this.$('.date-day').datepicker('setViewDate', fuzzyDateMoment.clone().date(15).toDate());
    this.$('.date-day').datepicker('setStartDate', fuzzyDateMoment.clone().startOf('month').toDate());
    this.$('.date-day').datepicker('setEndDate', fuzzyDateMoment.clone().endOf('month').toDate());

    this.updateDayInput();
  },

  dayDisabled: function () {
    return !this.get('date.hasDay') && !this.get('date.hasMonth');
  }.property('date.hasDay', 'date.hasMonth'),

  monthDisabled: function () {
    return !this.get('date.hasMonth') && !this.get('date.hasYear');
  }.property('date.hasMonth', 'date.hasYear'),

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.date-year').datepicker({
        format: 'yyyy',
        startView: 2,
        minViewMode: 2,
        autoclose: true,
        endDate: new Date()
      }).datepicker('setViewDate', moment().year(2000).toDate()); // defaults year picker to year 2000

      this.$('.date-month').datepicker({
        format: 'MM',
        startView: 1,
        minViewMode: 1,
        autoclose: true
      });

      this.$('.date-day').datepicker({
        format: 'd',
        startView: 0,
        minViewMode: 0,
        autoclose: true
      });

      this.updateInputs();
      this.attachInputEvents();
    });
  },

  focusIn: function () {
    this.sendAction('focus-in');
  },

  actions: {
    focus: function () {
      this.sendAction('focus');
    }
  }
});
