//= require ./registerableMixin

App.FuzzyDateComponent = Ember.Component.extend(App.RegisterableMixin, {
  classNames: ['form-line', 'fuzzy-date'],
  classNameBindings: ['mode'],
  completeOnDayChangeEnabled: true,
  hasFocus: false,

  init: function () {
    this._super();
    Utils.bindMethods(this, ['updateYear', 'updateMonth', 'updateDay', 'yearChanged', 'monthChanged', 'dayChanged', 'onDayDateClick', 'onBodyClick']);
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
    var isDatepicker, isSelf;

    if (!this.get('hasFocus')) {
      return;
    }

    isDatepicker = $(e.target).is('.day,.month,.year') || !$(e.target).parent().length || $(e.target).closest('.datepicker').length;
    isSelf = $(e.target).closest(this.$()).length;

    if (!isDatepicker && !isSelf) {
      this.set('hasFocus', false);
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
    this.set('completeOnDayChangeEnabled', false);

    this.$day.datepicker('setStartDate', null);
    this.$day.datepicker('setEndDate', null);

    this.set('completeOnDayChangeEnabled', true);
  },

  yearChanged: function (e, fromEnter) {
    Ember.run.next(this, function () {
      if (fromEnter === true || (!this.$(':focus') || !this.$(':focus').length)) {
        if (this.$month) {
          this.$month.focus();
        }
      }
    });
  },

  monthChanged: function (e, fromEnter) {
    Ember.run.next(this, function () {
      if (fromEnter === true || (!this.$(':focus') || !this.$(':focus').length)) {
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

  onDayDateClick: function () {
    this.dayChanged();
  },

  attachInputEvents: function () {
    $('body').on('click', this.onBodyClick);

    this.$year.on('changeDate', this.yearChanged);
    this.$month.on('changeDate', this.monthChanged);

    this.$day.on('afterDateClick enterDate', this.onDayDateClick);

    this.$year.on('change', this.updateYear);
    this.$month.on('change', this.updateMonth);
    this.$day.on('change', this.updateDay);
  },

  detachInputEvents: function () {
    $('body').off('click', this.onBodyClick);

    this.$year.off('changeDate', this.yearChanged);
    this.$month.off('changeDate', this.monthChanged);

    this.$day.off('afterDateClick enterDate', this.dayChanged);

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
      this.$year = this.$('.date-year');
      this.$month = this.$('.date-month');
      this.$day = this.$('.date-day');

      this.$year.datepicker({
        format: 'yyyy',
        startView: 2,
        minViewMode: 2,
        autoclose: true,
        startDate: moment().year(1850).startOf('year').toDate(),
        endDate: moment().endOf('year').toDate(),
        keyboardNavigation: false
      }).datepicker('setViewDate', moment().year(2000).toDate()); // defaults year picker to year 2000

      this.$month.datepicker({
        format: 'MM',
        startView: 1,
        minViewMode: 1,
        autoclose: true,
        keyboardNavigation: false
      });

      this.$day.datepicker({
        format: 'd',
        startView: 0,
        minViewMode: 0,
        autoclose: true,
        keyboardNavigation: false
      });

      this.updateInputs();
      this.attachInputEvents();
    });
  },

  focusIn: function () {
    this.set('hasFocus', true);
    this.sendAction('focus-in');
  },

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.TAB && !e.shiftKey) {
      if (!Utils.isValidDate($(e.target).datepicker('getDate')) || $(e.target).is(this.$day)) {
        this.tryComplete();
      }
    } else if (e.keyCode === Utils.Keys.TAB && e.shiftKey) {
      if ($(e.target).is(this.$year)) {
        this.tryComplete();
      }
    } else if (e.keyCode === Utils.Keys.ENTER) {
      $(e.target).trigger('change');
      $(e.target).trigger('changeDate', true);
      $(e.target).trigger('enterDate');
    }
  },

  tryComplete: function () {
    // datepicker fires multiple change events so let's debounce
    Ember.run.debounce(this, this.sendComplete, 25);
  },

  sendComplete: function () {
    if (this.checkForErrors()) { return; }

    this.hidePickers();
    this.sendAction('complete', this.get('date'));
  },

  checkForErrors: function () {
    var valid = this.get('date').isValid();

    if (!valid) {
      this.sendAction('error', this.getErrorStrings());
    }

    return !valid;
  },

  getErrorStrings: function () {
    var errors = this.get('date').getErrors();

    return errors.map(function (error) {
      return Ember.I18n.t(error);
    });
  }
});
