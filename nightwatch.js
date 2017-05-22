module.exports = {
  "src_folders" : ["server/test/e2e.js"],
  "output_folder" : "reports",

  "selenium" : {
    "start_process" : true,
    "server_path" : "./bin/selenium-server-standalone-3.4.0.jar",
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./bin/chromedriver.exe"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://ondemand.saucelabs.com:80",
      "selenium_port"  : 80,
      "selenium_host"  : "ondemand.saucelabs.com",
      "silent": true,
      "username": "process.env.SAUCE_USERNAME",
      "access_key": "process.env.SAUCE_ACCESS_KEY",
      "screenshots": {
        "enabled": false,
        "path": ""
      },
      "globals": {
        "waitForConditionTimeout": 10000
      },
      "chrome": {
        "desiredCapabilities": {
          "browserName": "chrome",
          "javascriptEnabled": true,
          "acceptSslCerts": true,
          "platform": "OS X 10.11",
          "version": "47"
        }
      },
      "ie11": {
        "desiredCapabilities": {
          "browserName": "internet explorer",
          "javascriptEnabled": true,
          "acceptSslCerts": true,
          "platform": "Windows 10",
          "version": "11.0"
        }
      },
      "desiredCapabilities": {
        "build": "build-${TRAVIS_JOB_NUMBER}",
        "tunnel-identifier": TRAVIS_JOB_NUMBER
      },
    }
  }
};