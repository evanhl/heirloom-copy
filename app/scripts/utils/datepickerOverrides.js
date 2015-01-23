// allows us to set the date of the datepicker pop-up without affecting the value of the input field itself
$.fn.datepicker.Constructor.prototype.setViewDate = function (date) {
  this.viewDate = date;
  this.fill();
};