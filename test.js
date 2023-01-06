const sdk = require('.')
const readline = require('readline')
const input_queue = []

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (key, data) => {
  if (data.sequence === '\u0003') {
    // ^C
    exit()
  }
  input_queue.push(key)
})

function exit(code = 0) {
  console.log('Exiting.')
  process.exit(code)
}

function getAvailableLeds() {
  const leds = []
  const { error, data: devices } = sdk.CorsairGetDevices({ deviceTypeMask: sdk.CorsairDeviceType.CDT_All })
  if (error != sdk.CorsairError.CE_Success) {
    return leds;
  }

  for (let di = 0; di < devices.length; ++di) {
    const { data: ledPositions } = sdk.CorsairGetLedPositions(devices[di].id)
    leds.push({ deviceId: devices[di].id, leds: ledPositions.map(p => ({ id: p.id, r: 0, g: 0, b: 0, a: 0 })) })
  }

  return leds
}

function performPulseEffect(allLeds, x) {
  const cnt = allLeds.length
  let val = ~~((1 - (x - 1) * (x - 1)) * 255)
  for (let di = 0; di < cnt; ++di) {
    const deviceLeds = allLeds[di]
    deviceLeds.leds.forEach(led => {
      led.r = 0
      led.g = val
      led.b = 0,
      led.a = 255
    })

    sdk.CorsairSetLedColorsBuffer(deviceLeds.deviceId, deviceLeds.leds)
  }
  sdk.CorsairSetLedColorsFlushBufferAsync()
}

function main() {
  sdk.CorsairConnect(() => {})

  const availableLeds = getAvailableLeds()
  if (!availableLeds.length) {
    console.error('No devices found')
    exit(1)
  }

  console.log(
    'Working... Use "+" or "-" to increase or decrease speed.\n' +
    'Press "q" to close program...'
  )

  function loop(leds, waveDuration, x) {
    const TIME_PER_FRAME = 25
    if (input_queue.length > 0) {
      const input = input_queue.shift()
      if (input === 'q' || input === 'Q') {
        exit(0)
      } else if (input === '+') {
        waveDuration = Math.max(100, waveDuration - 100)
      } else if (input === '-') {
        waveDuration = Math.min(2000, waveDuration + 100)
      }
    }

    performPulseEffect(leds, x)
    return setTimeout(
      loop,
      TIME_PER_FRAME,
      leds,
      waveDuration,
      (x + TIME_PER_FRAME / waveDuration) % 2
    )
  }

  return loop(availableLeds, 500, 0)
}

main()
