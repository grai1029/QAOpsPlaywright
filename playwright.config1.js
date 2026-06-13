// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  retries: 1,  
  workers: 3,
  /*maximum time 1 test can run for */
  timeout: 30*1000,
  expect : {
   timeout: 5*1000,
  },
  reporter : 'html',
  projects : [
    {
      name: 'safari',
      use: {
      browserName : 'webkit', //webkit for safari
      headless : false,
      screenshot : 'on', // on, off, only-on-failure
      trace : 'on', //off, on, retain-on-failure
      //viewport :{ width:720, height:720 },
      }
    },

    {
      name: 'chrome',
      use: {
      browserName : 'chromium', //webkit for safari
      headless : false,
      screenshot : 'on', // on, off, only-on-failure
      trace : 'on', //off, on, retain-on-failure
      video: 'retain-on-failure',
      //viewport :{ width:720, height:720 },
      //...devices ['iPhone 11 Pro Max' ],
     // ignoreHttpsError: true,  //ssl error close
     //permissions: ['geolocation'], //location pop up close
       }

    }
    
  ],

 
});

module.exports = config