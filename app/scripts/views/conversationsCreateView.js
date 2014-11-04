App.ConversationsCreateView = Ember.View.extend({
  RESULT_TEMPLATE: '<div class="icon"></div><div class="name">{{name}}</div><div class="sub">{{username}}</div>',

  initMultiSelect: function () {
    var self = this;

    this.$('.contacts').select2({
      minimumInputLength: 1,
      multiple: true,
      ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: HLConfig.HOSTNAME + '/me/connection_suggestions',
        dataType: 'json',
        data: function (term, page) {
          return {
            q: term, // search term
            global: "true"
          };
        },
        results: function (data, page) {
          // parse the results into the format expected by Select2.
          // since we are using custom formatting functions we do not need to alter remote JSON data
          return {results: data};
        }
      },
      formatResult: function (result) {
        return self.RESULT_TEMPLATE
          .replace('{{name}}', result.name)
          .replace('{{username}}', result.username);
      },
      formatSelection: function (selection) {
        return selection.name;
      }
    });
    this.$('.select2-choices').prepend($('<li class="pre-label">To:</li>'));
  }.on('didInsertElement'),

  destroyMultiSelect: function () {
    this.$('.contacts').select2('destroy');
  }.on('willDestroyElement')
});
