const newEvents = require('./Events.js')

const client = new newEvents(['joystick'])

/* TODO: Make no single argument, so you don't have to do:
  const direction = args[0];
  const angle = args[1];

  for every argument emitted
*/
client.on('joystick', (args) => {
  const direction = args[0];
  const angle = args[1];
  console.log(`The joystick is facing ${args[0]}, at exactly ${args[1]}.`)
})

// Let's say someone figures out that it's EventEmitter, and uses client#emit


// The program WILL crash, so we put it in a try so it doesn't.
try {
  client.emit('joystick', 'left', 90)
} catch (err) {
  console.error(err)
  /*
    Error: Event 'joystick' has been forbidden from being emitted. Change this by setting the forbidden parameter in the constructor.
  */
}

// But how will the program emit joystick? Easy.

client.unForbidEvent('joystick')
client.emit('joystick', 'left', 90) // The joystick is facing left, at exactly 90.
client.forbidEvent('joystick')

// The library uses a getter only array to forbid events. The only way to change this array is client#forbidEvent and client#unForbidEvent.

console.log(client.forbidden) // ['joystick']

client.forbidden = ["no!"]

console.log(client.forbidden) // ['joystick']

// Unfortunately, it's an array, so methods will work.

client.forbidden.push("button")

console.log(client.forbidden) // ['joystick', 'button']