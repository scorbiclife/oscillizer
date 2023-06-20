# Oscillizer-web

Jason Summers' Oscillizer implemented in Vanilla HTML5/CSS3/ES6.

## About

[Oscillizer](https://entropymine.com/jason/life/oscillizer/)
is a program by Jason Summers that analyzes oscillators.

This is a simple web version of oscillizer using vanilla JS, CSS, and HTML.

## Installation

Run `npm install` to install the development dependencies.

## Developing

The entire codebase is a static webpage that lives inside `src`.
You should be able to open `src/index.html` in a web browser.
You could also launch a live-reloading dev server with `npm run dev`.

### Bundling with Parcel

Parcel is used to bundle the page to `docs`,
which is where Github Pages looks for the files to serve.
You can bundle the page with `npm run build`.
(TODO: automate this with a pre-commit hook.)

You can open `docs/index.html` to see the bundled web page.
Alternatively you can run `npm run server` to serve the bundled page
at `http://localhost:8080`.

## Testing

Currently unit tests are done via Cypress.
(TODO: Migrate to jest for unit tests)
First, serve the bundled web page with `npm run server`.
On another terminal, run `npm run cypress` to open the cypress client,
or `npm run test` to just run the tests from the cli.
