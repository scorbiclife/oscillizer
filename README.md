# Oscillizer-web

Jason Summers' Oscillizer implemented in Vanilla HTML5/CSS3/ES6.

## About

[Oscillizer](https://entropymine.com/jason/life/oscillizer/)
is a program by Jason Summers that analyzes oscillators.

This is a simple web version of oscillizer
that aims to minimize moving parts.
There is no build step,
just serve whatever living in `/docs` for now.

### More on minimalism

Having no build step means
having to write ES6 for decent browser support.
Although ES6 is modern enough to code in without going insane,
it does have its pain points,
the most notable one being illegal trailing commas in functions.
