Utils.Facebook = Ember.Object.extend({
  // FIXME: pull correct app ID for environment (prod vs. staging)
  appId: '593382107427220',
  isInit: false,

  initFacebook: function () {
    var self = this;

    if (typeof FB === 'undefined') {
      window.fbAsyncInit = function () {
        self.fbApiLoaded();
      };

      // Load API
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }
  },

  fbApiLoaded: function () {
    this.set('isInit', true);

    FB.init({
      appId: this.get('appId'),
      xfbml: false,
      version: 'v2.0'
    });
  },

  attemptLogin: function () {
    var self = this;

    FB.login(self.didAttemptLogin);
  },

  didAttemptLogin: function (response) {
    if (response.status !== 'connected') {
      // TODO: handle user didn't approve
      return;
    }

    var fbIdentity = App.Identity.create({
        provider: 'facebook',
        token: response.authResponse.accessToken
    });
    fbIdentity.save();
  }
});