// allows us to set the date of the datepicker pop-up without affecting the value of the input field itself
$.fn.datepicker.Constructor.prototype.setViewDate = function (date) {
  this.viewDate = date;
  this.fill();
};

$.fn.datepicker.DPGlobal.parseDateWithViewDate = function (date, format, language, viewDate) {
  if (format === 'd' && date && (typeof date === 'string')) {
    date = this.formatDate(viewDate, this.parseFormat('yyyy/mm/'), language) + date;
    format = this.parseFormat('yyyy/mm/d');
  }

  return this.parseDate(date, format, language);
};

$.fn.datepicker.Constructor.prototype.update = function () {
  if (!this._allow_update) { return; }

  var DPGlobal = $.fn.datepicker.DPGlobal;

  var oldDates = this.dates.copy(),
    dates = [],
    fromArgs = false;
  if (arguments.length){
    $.each(arguments, $.proxy(function(i, date){
      if (date instanceof Date) {
        date = this._local_to_utc(date);
      }
      dates.push(date);
    }, this));
    fromArgs = true;
  }
  else {
    dates = this.isInput
        ? this.element.val()
        : this.element.data('date') || this.element.find('input').val();
    if (dates && this.o.multidate) {
      dates = dates.split(this.o.multidateSeparator);
    } else {
      dates = [dates];
    }
    delete this.element.data().date;
  }

  // This parsing behavior is really the only behavior we need to override
  dates = $.map(dates, $.proxy(function(date){
    return DPGlobal.parseDateWithViewDate(date, this.o.format, this.o.language, this.viewDate);
  }, this));
  dates = $.grep(dates, $.proxy(function(date){
    return (
      date < this.o.startDate ||
      date > this.o.endDate ||
      !date
    );
  }, this), true);
  this.dates.replace(dates);

  if (this.dates.length) {
    this.viewDate = new Date(this.dates.get(-1));
  } else if (this.viewDate < this.o.startDate) {
    this.viewDate = new Date(this.o.startDate);
  } else if (this.viewDate > this.o.endDate) {
    this.viewDate = new Date(this.o.endDate);
  }

  if (fromArgs){
    // setting date by clicking
    this.setValue();
  }
  else if (dates.length){
    // setting date by typing
    if (String(oldDates) !== String(this.dates)) {
      this._trigger('changeDate');
    }
  }
  if (!this.dates.length && oldDates.length) {
    this._trigger('clearDate');
  }

  this.fill();
};

$.fn.datepicker.Constructor.prototype.__setDate = $.fn.datepicker.Constructor.prototype._setDate;
$.fn.datepicker.Constructor.prototype._setDate = function (date) {
  this.__setDate(date);
  this._trigger('afterDateClick');
};
