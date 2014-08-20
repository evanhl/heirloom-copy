# Heirloom Web

Ember.js web application for Heirloom. Intended to be packaged and deployed to a web or platform server.

## Set up for OS X

- Install [Homebrew](http://brew.sh/).
- Run `brew install node`, which installs node and npm.
- `git clone` this repo.
- `cd` to repo dir.
- Run `npm install -g grunt-cli`
- Run `grunt serve` to build and run on `localhost:9000`

## Environments

The default environment is `development`. To change this set the environment variable `WEB_ENV` to production, staging, development, or local. You'll need to re-run Grunt for the new environment to take effect.

The environment controls with config script gets included in the JS payload. The config files can be found in `app/scripts/config/`.