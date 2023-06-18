/**
 * An interface that defines a controller.
 * @typedef {Object} IController
 * @property {function(Event): void} update
 *  The callback that updates whatever target of the controller.
 *
 *  Important: This should not have an dangling unresolved `this` variable!
 *  <br>
 *  Either bind the function (`this.update = this.doSomething.bind(this)`)
 *  or use an arrow function (`this.update = () => this.doSomething(arg)`)
 */

export default {};
