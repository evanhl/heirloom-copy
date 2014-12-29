//= require ./utils

Utils.Transloadit = {
  HOST: 'https://api2.transloadit.com',
  // TODO: use signature-based auth
  AUTH_KEY: 'b6f68d408ae611e49fa1451ce8c8c2d1',
  ZIP_TEMPLATE_ID: '8f97f7108af111e4a34505ff6b8197c8',

  // post assembly
  createZip: function (urls, success, error) {
    var data = {
      params: JSON.stringify({
        auth: {
          // This is your API key.
          key: 'b6f68d408ae611e49fa1451ce8c8c2d1'
        },
        template_id: this.ZIP_TEMPLATE_ID,
        fields: {
          fileUrls: urls.join('|')
        }
      })
    };

    Utils.ajaxJson(this.HOST + '/assemblies', 'POST', data, success, error);
  },

  // check assembly status
  checkZipStatus: function (assemblyUrl, success) {
    Utils.ajaxJson(assemblyUrl, 'GET', {}, success);
  },

  // get zip URL from response
  getZipUrl: function(response) {

  }
};
