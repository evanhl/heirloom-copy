//= require ./utils

Utils.Transloadit = {
  HOST: 'https://api2.transloadit.com',
  ZIP_TEMPLATE_ID: HLConfig.zipTemplateId,
  STAGES: ['download:::original', 'zip::download', 'upload::zip'],

  createZip: function (urls, success, error) {
    var self = this;
    var data = {
      template_id: this.ZIP_TEMPLATE_ID,
      fields: {
        fileUrls: urls.join('|')
      }
    };

    Utils.apiCall('/transloadit_signature', 'POST', data, function (response) {
      Utils.ajaxJson(self.HOST + '/assemblies', 'POST', response, success, error);
    }, error);
  },

  checkZipStatus: function (assemblyUrl, success, error) {
    Utils.ajaxJson(assemblyUrl, 'GET', {}, success, error);
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
