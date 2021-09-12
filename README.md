# EventEmitterButBetter
Uses the default [`events`](https://nodejs.org/dist/v11.13.0/docs/api/events.html) module, but adds more features including a blacklist system for emitting events.

## Usage
```js
const EventEmitter = require('eventemitterbutbetter')

const controller = new EventEmitter(['joystick'])

controller.on('joystick', (args) => {
  const direction = args[0];
  const angle = args[1];
  console.log(`The joystick is facing ${args[0]}, at exactly ${args[1]}.`)
})

controller.emit('joystick', 'left', 90)
/*
  Error: Event 'joystick' has been forbidden from being emitted. Change this by setting the forbidden parameter in the constructor.  
*/
```

## This library is a WIP, and if you'd like to help, message me on Discord ([here's my bio](https://dsc.bio/haroongames)).