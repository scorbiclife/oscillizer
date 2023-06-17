# Oscillizer-web

Jason Summers' Oscillizer implemented in Vanilla HTML5/CSS3/ES6.

## About

[Oscillizer](https://entropymine.com/jason/life/oscillizer/)
is a program by Jason Summers that analyzes oscillators.

This is a simple and minimal web remake of oscillizer.

## Installation

Run `npm install` to install the development dependencies.

## Running the page

The entire codebase is intended to work as
a static webpage that lives inside `/src`.
Thus you can open `/src/index.html` to see the web page.
Alternatively, if you installed the dev-dependencies,
you can run `npm start` to serve the page on a local port.

## Testing

Currently unit tests are done via Cypress, but migration to jest is uinderway.
Run `npm test` to run the unit tests.
Run `npm run cypress` to open the cypress client,
