# WalmartExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

## Philosophy of my Approach

In addition to the two API calls we were instructed to use, I used the Product Lookup API so that there would be routes that loaded independent of the main search page (i.e. http://localhost:4200/item/33282228) that would display the selected item from the search and could be refreshed or loaded independently of the Search API results.

I also relied heavily on the Angular Component architecture, in specific, creating a versatile "item" Component which I was able to reuse in three unique ways across the single page application.

Examples of how I implemented responsive design include media queries, font size scaling based on view width, and flex-box magic.

## Development server

One will need to run Chrome with --disable-web-security and --user-data-dir="" to prevent CORS issues due to the localhost/walmart URL origin conflict which most modern browsers flag as a CORS violation. Please refer to the following StackOverflow page:
https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

How to Run Chrome with CORS disabled via Command Line:

Example for Mac: 

`open -a Google\ Chrome --args --disable-web-security --user-data-dir=""`

Example for Windows: Find the location of chrome.exe on your particular OS, then

`chrome.exe --disable-web-security --user-data-dir=""`

Remember to close all instances of Chrome before running Chrome via these commands, or Chrome preventing CORS violations will not be properly disabled. You will see a message when your Chrome window opens up if you have done this successfully.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
