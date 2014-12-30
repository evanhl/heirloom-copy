//= require ./utils

Utils.Transloadit = {
  HOST: 'https://api2.transloadit.com',
  // TODO: use signature-based auth
  AUTH_KEY: 'b6f68d408ae611e49fa1451ce8c8c2d1',
  ZIP_TEMPLATE_ID: HLConfig.zipTemplateId,
  STAGES: ['download:::original', 'zip::download', 'upload::zip'],

  createZip: function (urls, success, error) {
    var data = {
      params: JSON.stringify({
        auth: {
          key: this.AUTH_KEY
        },
        template_id: this.ZIP_TEMPLATE_ID,
        fields: {
          fileUrls: urls.join('|')
        }
      })
    };

    Utils.ajaxJson(this.HOST + '/assemblies', 'POST', data, success, error);
  },

  checkZipStatus: function (assemblyUrl, success) {
    Utils.ajaxJson(assemblyUrl, 'GET', {}, success);
  },

  getZipUrl: function (response) {
    var url;

    try {
      url = response.results.zip[0].ssl_url;

      if (HLConfig.zipHost) {
        url = HLConfig.zipHost + Utils.getPathName(url);
      }
    } catch (e) {}

    return url;
  },

  getStageNumber: function (response) {
    var stageNum = 0;

    try {
      stageNum = response.started_jobs.length;
    } catch (e) {}

    return stageNum;
  },

  getNumStages: function () {
    return this.STAGES.length;
  }
};
