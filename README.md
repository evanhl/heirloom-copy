# Heirloom Web

Ember.js web application for Heirloom. Intended to be packaged and deployed to a web or platform server.

## Set up for OS X

- Install [Homebrew](http://brew.sh/).
- Run `brew install node`, which installs node and npm.
- `git clone` this repo.
- `cd` to repo dir.
- Run `npm install -g grunt-cli` (NOTE: You may need to run as `sudo`.)
- Run `grunt serve` to build and run on `localhost:9000`. (NOTE: If you have errors starting up the server ensure that you don't have a `.tmp` folder in your directory. If you do `rm -r` it.)

## Environments

The default environment is `development`. To change this set the environment variable `WEB_ENV` to production, staging, development, or local. You'll need to re-run Grunt for the new environment to take effect.

The environment controls with config script gets included in the JS payload. The config files can be found in `app/scripts/config/`.
