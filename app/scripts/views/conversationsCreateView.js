App.ConversationsCreateView = Ember.View.extend({
  RESULT_TEMPLATE: '<div class="icon"></div><div class="name">{{name}}</div><div class="sub">{{username}}</div>',

  initMultiSelect: function () {
    var self = this;
    var $contacts = this.$('.contacts');

    $contacts.select2({
      minimumInputLength: 1,
      multiple: true,
      ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: HLConfig.HOSTNAME + '/me/connection_suggestions',
        dataType: 'json',
        data: function (term, page) {
          return {
            q: term // search term
          };
        },
        results: function (data, page) {
          // parse the results into the format expected by Select2.
          // since we are using custom formatting functions we do not need to alter remote JSON data
          return { results: data };
        }
      },
      formatResult: function (result) {
        return self.RESULT_TEMPLATE
          .replace('{{name}}', result.name)
          .replace('{{username}}', result.username);
      },
      formatSelection: function (selection) {
        return selection.name;
      },
      formatInputTooShort: function (foo) {
        return '';
      },
      placeholder: Ember.I18n.t('conversations.new.placeholder')
    });

    this.$('.select2-choices').prepend($('<li class="pre-label"></li>').text(Ember.I18n.t('conversations.new.preLabel')));

    $contacts.on('change', function () {
      self.controller.set('selectedContacts', $(this).select2('val'));
    });
  }.on('didInsertElement'),

  destroyMultiSelect: function () {
    this.$('.contacts').select2('destroy');
    this.$('.contacts').off('change');
  }.on('willDestroyElement')
});
