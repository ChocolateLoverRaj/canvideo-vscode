/* eslint-env worker */
// eslint-disable-next-line no-unused-vars
const exportFromWebWorker = value => {
  const transformValue = value => {
    const newValue = {}
    const ports = []
    if (typeof value === 'function') {
      newValue.type = 'function'
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = e => {
        const returnValue = value(...e.data)
        const { value: newValue, ports } = transformValue(returnValue)
        e.ports[0].postMessage(newValue, { transfer: ports })
      }
      newValue.value = messageChannel.port2
      ports.push(messageChannel.port2)
    } else if (typeof value === 'object') {
      if (value instanceof Array) {
        newValue.type = 'array'
        newValue.value = value.map(value => {
          const { value: newValue, ports: subPorts } = transformValue(value)
          ports.push(...subPorts)
          return newValue
        })
      } else {
        newValue.type = 'object'
        newValue.value = Object.fromEntries(Object.entries(value).map(([key, value]) => {
          const { value: newValue, ports: subPorts } = transformValue(value)
          ports.push(...subPorts)
          return [key, newValue]
        }))
      }
    } else {
      newValue.type = 'primitive'
      newValue.value = value
    }
    return { value: newValue, ports }
  }

  const { value: newValue, ports } = transformValue(value)
  postMessage(newValue, {
    transfer: ports
  })
}
