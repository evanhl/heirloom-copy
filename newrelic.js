/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
env_name = (process.env.WEB_ENV || "development");
app_name = 'Heirloom Web [' + env_name.charAt(0).toUpperCase() + env_name.substring(1) + ']';

exports.config = {
  /**
   * Array of application names.
   */
  app_name : [app_name],
  /**
   * Your New Relic license key.
   */
  license_key : process.env.NEW_RELIC_LICENSE_KEY,
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  }
};
