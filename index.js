const newEvents = require('./Events.js')

const controller = new newEvents(['joystick'])

/* TODO: Make no single argument, so you don't have to do:
  const direction = args[0];
  const angle = args[1];

  for every argument emitted
*/
controller.on('joystick', (args) => {
  const direction = args[0];
  const angle = args[1];
  console.log(`The joystick is facing ${args[0]}, at exactly ${args[1]}.`)
})

// Let's say someone figures out that it's EventEmitter, and uses controller#emit


// The program WILL crash, so we put it in a try so it doesn't.
try {
  controller.emit('joystick', 'left', 90)
} catch (err) {
  console.error(err)
  /*
    Error: Event 'joystick' has been forbidden from being emitted. Change this by setting the forbidden parameter in the constructor.
  */
}

// But how will the program emit joystick? Easy.

controller.unForbidEvent('joystick')
controller.emit('joystick', 'left', 90) // The joystick is facing left, at exactly 90.
controller.forbidEvent('joystick')

// The library uses a getter only array to forbid events. The only way to change this array is controller#forbidEvent and controller#unForbidEvent.

console.log(controller.forbidden) // ['joystick']

controller.forbidden = ["no!"]

console.log(controller.forbidden) // ['joystick']

// Unfortunately, it's an array, so methods will work.

controller.forbidden.push("button")

console.log(controller.forbidden) // ['joystick', 'button']