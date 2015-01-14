App.ShareMixin = Ember.Mixin.create({
  TWITTER_SHARE_URL: 'https://www.twitter.com/intent/tweet?text=',
  FB_SHARE_URL: 'https://www.facebook.com/dialog/share?app_id=593382107427220&display=popup&redirect_uri=https://www.heirloom.net/closeWindow&href=',

  showShareMenu: false,

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
      // TODO: handle error
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

  actions: {
    toggleShare: function () {
      this.toggleProperty('showShareMenu');
    },

    twitterShare: function () {
      this.openTwitterShare();
      this.set('showShareMenu', false);
    },

    facebookShare: function () {
      this.openFacebookShare();
      this.set('showShareMenu', false);
    }
  }
});
