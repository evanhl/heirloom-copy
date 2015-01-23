App.FuzzyDateComponent = Ember.Component.extend({
  classNames: ['form-line', 'fuzzy-date'],
  classNameBindings: ['mode'],

  init: function () {
    this._super();
    Utils.bindMethods(this, ['updateYear', 'updateMonth', 'updateDay']);
  },

  updateYear: function () {
    var yearDate = this.$('.date-year').datepicker('getDate');

    this.get('date').setYear(moment(yearDate).year());
    this.updateDayPickerViewDate();
  },

  updateMonth: function () {
    var monthDate = this.$('.date-month').datepicker('getDate');

    this.get('date').setMonth(moment(monthDate).month());
    this.updateDayPickerViewDate();
  },

  updateDay: function () {
    var dayDate = this.$('.date-day').datepicker('getDate');

    this.get('date').setDay(moment(dayDate).date());
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

    if (this.get('date.hasDay')) {
      this.$('.date-day').datepicker('setDate', this.get('date.date').clone().toDate());
    } else {
      this.$('.date-day').datepicker('setDate', null);
    }
  },

  dateChanged: function () {
    this.resetDayPickerViewDate();
    this.detachInputEvents();
    this.updateInputs();
    this.attachInputEvents();
  }.observes('date'),

  resetDayPickerViewDate: function () {
    this.$('.date-day').datepicker('setStartDate', null);
    this.$('.date-day').datepicker('setEndDate', null);
  },

  attachInputEvents: function () {
    this.$('.date-year').on('change', this.updateYear);
    this.$('.date-month').on('change', this.updateMonth);
    this.$('.date-day').on('change', this.updateDay);
  },

  detachInputEvents: function () {
    this.$('.date-year').off('change', this.updateYear);
    this.$('.date-month').off('change', this.updateMonth);
    this.$('.date-day').off('change', this.updateDay);
  },

  updateDayPickerViewDate: function () {
    var fuzzyDateMoment = this.get('date.date');

    this.$('.date-day').datepicker('setViewDate', fuzzyDateMoment.clone().date(15).toDate());
    this.$('.date-day').datepicker('setStartDate', fuzzyDateMoment.clone().startOf('month').toDate());
    this.$('.date-day').datepicker('setEndDate', fuzzyDateMoment.clone().endOf('month').toDate());
  },

  mode: function () {
    if (this.get('date.hasDay') || this.get('date.hasMonth')) {
      return 'day-mode';
    } else if (this.get('date.hasYear')) {
      return 'month-mode';
    } else {
      return 'year-mode';
    }
  }.property('date.hasDay', 'date.hasMonth', 'date.hasYear'),

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.date-year').datepicker({
        format: 'yyyy',
        startView: 2,
        minViewMode: 2,
        autoclose: true,
        endDate: new Date()
      });

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
  }
});
