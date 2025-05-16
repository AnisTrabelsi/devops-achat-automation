// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Indique à Karma où trouver le binaire Chromium
process.env.CHROME_BIN = '/usr/bin/chromium-browser';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // tu peux configurer Jasmine ici (random, seed, etc.)
      },
      clearContext: false // laisse le spec runner visible
    },
    jasmineHtmlReporter: {
      suppressAll: true // supprime les traces dupliquées
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/achat-frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // Passe de 'Chrome' à 'ChromeHeadless' pour CI / VM sans interface graphique
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
