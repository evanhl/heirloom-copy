//= require ./registerableMixin

App.FuzzyDateComponent = Ember.Component.extend(App.RegisterableMixin, {
  classNames: ['form-line', 'fuzzy-date'],
  classNameBindings: ['mode'],
  completeOnDayChangeEnabled: true,

  init: function () {
    this._super();
    Utils.bindMethods(this, ['updateYear', 'updateMonth', 'updateDay', 'yearChanged', 'monthChanged', 'dayChanged', 'onBodyClick']);
  },

  updateYear: function () {
    var yearDate = this.getYearFieldValue();
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
    var monthDate = this.getMonthFieldValue();
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
    var dayDate = this.getDayFieldValue();
    var day;

    if (Utils.isValidDate(dayDate)) {
      day = moment(dayDate).date();
    } else {
      day = null;
    }

    this.get('date').setDay(day);
  },

  getYearFieldValue: function () {
    return this.$year.datepicker('getDate');
  },

  getMonthFieldValue: function () {
    return this.$month.datepicker('getDate');
  },

  getDayFieldValue: function () {
    return this.$day.datepicker('getDate');
  },

  getLastFilledField: function () {
    if (Utils.isValidDate(this.getDayFieldValue())) {
      return this.$day;
    } else if (Utils.isValidDate(this.getMonthFieldValue())) {
      return this.$month;
    } else {
      return this.$year;
    }
  },

  enterAndFocus: function () {
    // wait until Ember un-hides this
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.getLastFilledField().focus();
    });
  },

  updateInputs: function () {
    this.updateYearInput();
    this.updateMonthInput();
    this.updateDayInput();
  },

  updateDayInput: function () {
    if (this.get('date.hasDay')) {
      this.$day.datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$day.datepicker('setDate', null);
    }
  },

  updateMonthInput: function () {
    if (this.get('date.hasMonth')) {
      this.$month.datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$month.datepicker('setDate', null);
    }
  },

  updateYearInput: function () {
    if (this.get('date.hasYear')) {
      this.$year.datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$year.datepicker('setDate', null);
    }
  },

  onBodyClick: function (e) {
    var isDatepicker = $(e.target).is('.day,.month,.year') || !$(e.target).parent().length || $(e.target).closest('.datepicker').length;
    var isSelf = $(e.target).closest(this.$()).length;

    if (!isDatepicker && !isSelf) {
      this.tryComplete();
    }
  },

  dateModelChanged: function () {
    this.resetDayPickerViewDate();
    this.detachInputEvents();
    this.updateInputs();
    this.attachInputEvents();
  }.observes('date'),

  resetDayPickerViewDate: function () {
    this.$day.datepicker('setStartDate', null);
    this.$day.datepicker('setEndDate', null);
  },

  yearChanged: function () {
    Ember.run.next(this, function () {
      if (!this.$(':focus') || !this.$(':focus').length) {
        if (this.$month) {
          this.$month.focus();
        }
      }
    });
  },

  monthChanged: function () {
    Ember.run.next(this, function () {
      if (!this.$(':focus') || !this.$(':focus').length) {
        if (this.$day) {
          this.$day.focus();
        }
      }
    });
  },

  dayChanged: function () {
    if (!this.get('completeOnDayChangeEnabled')) { return; }

    if (Utils.isValidDate(this.getDayFieldValue())) {
      this.tryComplete();
    }
  },

  attachInputEvents: function () {
    $('body').on('click', this.onBodyClick);

    this.$year.on('changeDate', this.yearChanged);
    this.$month.on('changeDate', this.monthChanged);
    this.$day.on('changeDate', this.dayChanged);

    this.$year.on('change', this.updateYear);
    this.$month.on('change', this.updateMonth);
    this.$day.on('change', this.updateDay);
  },

  detachInputEvents: function () {
    $('body').off('click', this.onBodyClick);

    this.$year.off('changeDate', this.yearChanged);
    this.$month.off('changeDate', this.monthChanged);
    this.$day.off('changeDate', this.dayChanged);

    this.$year.off('change', this.updateYear);
    this.$month.off('change', this.updateMonth);
    this.$day.off('change', this.updateDay);
  },

  updateDayPickerViewDate: function () {
    var fuzzyDateMoment = this.get('date.date');

    // this flag allows us to distinguish the code setting the day input vs. the user setting it
    this.set('completeOnDayChangeEnabled', false);

    this.$day.datepicker('setViewDate', fuzzyDateMoment.clone().date(15).toDate());
    this.$day.datepicker('setStartDate', fuzzyDateMoment.clone().startOf('month').toDate());
    this.$day.datepicker('setEndDate', fuzzyDateMoment.clone().endOf('month').toDate());

    this.updateDayInput();
    this.set('completeOnDayChangeEnabled', true);
  },

  hidePickers: function () {
    this.$year.datepicker('hide');
    this.$month.datepicker('hide');
    this.$day.datepicker('hide');
  },

  dayDisabled: function () {
    return !this.get('date.hasDay') && !this.get('date.hasMonth');
  }.property('date.hasDay', 'date.hasMonth'),

  monthDisabled: function () {
    return !this.get('date.hasMonth') && !this.get('date.hasYear');
  }.property('date.hasMonth', 'date.hasYear'),

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$year = this.$('.date-year').datepicker({
        format: 'yyyy',
        startView: 2,
        minViewMode: 2,
        autoclose: true,
        startDate: moment().year(1850).startOf('year').toDate(),
        endDate: moment().endOf('year').toDate(),
      }).datepicker('setViewDate', moment().year(2000).toDate()); // defaults year picker to year 2000

      this.$month = this.$('.date-month').datepicker({
        format: 'MM',
        startView: 1,
        minViewMode: 1,
        autoclose: true
      });

      this.$day = this.$('.date-day').datepicker({
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

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.TAB) {
      if (!Utils.isValidDate($(e.target).datepicker('getDate')) || $(e.target).is(this.$day)) {
        this.tryComplete();
      }
    }
  },

  tryComplete: function () {
    Ember.run.debounce(this, this.sendComplete, 25);
  },

  sendComplete: function () {
    this.hidePickers();
    this.sendAction('complete');
  }
});
