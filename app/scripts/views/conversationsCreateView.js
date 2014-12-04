App.ConversationsCreateView = Ember.View.extend({
  classNames: 'main-col-content',
  // Maybe one day Ember will support manually rendering a template to a string.
  // See this discussion thread: http://discuss.emberjs.com/t/how-to-render-a-template-to-a-string/6136/6
  ICON_TEMPLATE: '<div class="icon"><span>{{initials}}</span>',
  AVATAR_TEMPLATE: '<div class="avatar"><img src="{{avatarUrl}}"></div>',
  NAME_TEMPLATE: '</div><div class="name">{{name}}</div><div class="sub">{{username}}</div>',

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
      formatResult: function (contact) {
        return self.genContactHtml(contact);
      },
      formatSelection: function (selection) {
        return selection.name;
      },
      formatInputTooShort: function (foo) {
        return '';
      },
      createSearchChoice: function(term) {
        if (Utils.isProbablyAValidEmail(term)) {
          return {
            name: term,
            id: term
          };
        }
      },
      placeholder: Ember.I18n.t('conversations.new.placeholder')
    });

    this.$('.select2-choices').prepend($('<li class="pre-label"></li>').text(Ember.I18n.t('conversations.new.preLabel')));

    $contacts.on('change', function () {
      self.controller.set('selectedContacts', $(this).select2('val'));
    });
  }.on('didInsertElement'),

  genContactHtml: function (contact) {
    var iconHtml;
    var nameHtml;

    if (contact.avatar_photo && contact.avatar_photo.versions && contact.avatar_photo.versions.xxs) {
      iconHtml = this.AVATAR_TEMPLATE
        .replace('{{avatarUrl}}', contact.avatar_photo.versions.xxs.url);
    } else {
      iconHtml = this.ICON_TEMPLATE
        .replace('{{initials}}', Utils.getInitials(contact.name || ''));
    }

    nameHtml = this.NAME_TEMPLATE
      .replace('{{name}}', contact.name || '')
      .replace('{{username}}', contact.username || '');

    return iconHtml + nameHtml;
  },

  destroyMultiSelect: function () {
    this.$('.contacts').select2('destroy');
    this.$('.contacts').off('change');
  }.on('willDestroyElement')
});
