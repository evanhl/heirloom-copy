App.FuzzyDateComponent = Ember.Component.extend({
  classNames: ['form-line', 'fuzzy-date'],

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.date-year').datepicker({
        format: "yyyy",
        startView: 2,
        minViewMode: 2
      });

      this.$('.date-month').datepicker({
        format: "MM",
        startView: 1,
        minViewMode: 1
      });

      this.$('.date-day').datepicker({
        format: "dd",
        startView: 0,
        minViewMode: 0
      });
    });
  }
});
