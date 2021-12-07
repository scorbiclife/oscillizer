# Oscillizer-web

A simple static web page of Jason Summers' Oscillizer.

~~Implemented in Vanilla HTML5/CSS3/ES6.~~

Currently migration to TypeScript in progress.

## About

[Oscillizer](https://entropymine.com/jason/life/oscillizer/)
is a program by Jason Summers that analyzes oscillators.

This is a simple static web page of oscillizer
that aims to minimize moving parts.

For a working demo, see https://nightlyherb.github.io/oscillizer.

## Installation

Run `npm install` to install the development dependencies.

## Building and running the page

Before running the page you need to build it first.

To build, run `npm run build:dev` for a development build,
or `npm run build:release` for a release build.

The built source should be a static webpage inside `/build`.
Thus you can open `/build/index.html` to see the web page.
Alternatively you can run `npm run server` to serve the page.

## Testing

Currently unit tests are done via Cypress.
In order to open the Cypress client, run `npm run cypress`.
In order to test with Cypress cli, run `npm run server`
and then run `npm run test` from a separate terminal.
