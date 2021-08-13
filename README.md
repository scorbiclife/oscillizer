# Oscillizer-web

Jason Summers' Oscillizer implemented in Vanilla HTML5/CSS3/ES6.

## About

[Oscillizer](https://entropymine.com/jason/life/oscillizer/)
is a program by Jason Summers that analyzes oscillators.

This is a simple web version of oscillizer
that aims to minimize moving parts.

## Installation

Run `npm install` to install the development dependencies.

## Running the page

The entire codebase is a static webpage and lives inside `/docs`.
Thus you can open `/docs/index.html` to see the web page.
Alternatively you can run `npx http-server docs` to serve the page.

## Testing

Currently unit tests are done via Cypress.
Run `npx cypress open` to open the cypress client,
or `npx cypress run` to just run the tests from the cli.

## Documentation

Currently JSDoc is used to generate documentation.
Run `npx jsdoc -c jsdoc.json docs` and the docs will be in `/jsdoc`.
