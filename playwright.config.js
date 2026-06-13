// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
 // retries: 1,  
  /*maximum time 1 test can run for */
  timeout: 30*1000,
  expect : {
   timeout: 5*1000,
  },
 reporter : 'html',
//   //reporter : [
//     ['list]'],
//     ['allure-playwright']
// ],

  use: {
browserName : 'chromium', //webkit for safari
headless : false,
screenshot : 'on', // on, off, only-on-failure
trace : 'on', //off, on, retain-on-failure

  },

});

module.exports = config