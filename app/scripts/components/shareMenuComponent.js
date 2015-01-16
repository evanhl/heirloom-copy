//= require registerableMixin
//= require ../views/toastableMixin

App.ShareMenuComponent = Ember.Component.extend(App.RegisterableMixin, App.ToastableMixin, {
  TWITTER_SHARE_URL: 'https://www.twitter.com/intent/tweet?text=',
  FB_SHARE_URL: 'https://www.facebook.com/dialog/share?app_id=593382107427220&display=popup&redirect_uri=https://www.heirloom.net/closeWindow&href=',

  shareExternal: function () {
    var self = this;
    var data;

    if (this.get('selectedIds.length') > 1) {
      data = {
        type: 'photo_set',
        ids: this.get('selectedIds'),
        locale: 'en'
      };
    } else {
      data = {
        type: 'photo',
        id: this.get('selectedIds')[0],
        locale: 'en'
      };
    }

    Utils.apiCall('/share', 'POST', data, function (data) {
      self.set('shareText', data.body);
      self.set('shareLoading', false);
    }, function () {
      self.close();
      self.doToast('share.linkGenerateFailed', null, 'toast-error');
    });
  },

  openFacebookShare: function () {
    this.openSocialShare(this.FB_SHARE_URL);
  },

  openTwitterShare: function () {
    this.openSocialShare(this.TWITTER_SHARE_URL);
  },

  openSocialShare: function (shareUrl) {
    window.open(shareUrl + this.get('shareText'), 'share', 'width=550, height=450');
  },

  onShowShareMenuChange: function () {
    if (this.get('showShareMenu')) {
      this.set('shareLoading', true);
      this.shareExternal();
    } else {
      this.set('shareText', null);
    }
  }.observes('showShareMenu'),

  close: function () {
    if (this.get('bubbleMenu')) {
      this.get('bubbleMenu').close();
    }
  },

  toggle: function () {
    if (this.get('bubbleMenu')) {
      this.get('bubbleMenu').toggle();
    }
  },

  actions: {
    twitterShare: function () {
      this.openTwitterShare();
      this.close();
    },

    facebookShare: function () {
      this.openFacebookShare();
      this.close();
    }
  }
});