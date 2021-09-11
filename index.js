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
}

// But how will the program emit joystick? Easy.

client.unForbidEvent('joystick')
client.emit('joystick', 'left', 90)
client.forbidEvent('joystick')

// The library uses a private array to forbid events. The only way to change this array is client#forbidEvent and client#unForbidEvent.