require('babel-register');

const seleniumServer = require('selenium-server');
const phantomjs = require('phantomjs-prebuilt');
const chromedriver = require('chromedriver');

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--compiler', 'js:babel-core/register',
    '--require', 'test/e2e/features/step_definitions',
    // '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:test/e2e/reports/cucumber_report.json',
    'test/e2e/features',
  ],
});

module.exports = {
  src_folders: ['test/e2e/features'],
  output_folder: 'test/e2e/reports',
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
    },
  },
  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'phantomjs.binary.path': phantomjs.path,
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'test/e2e/screenshots',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
        },
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'test/e2e/screenshots',
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
