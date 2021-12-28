import Asyncified from './Asyncified'

const browserSideApi = (transferredApi: any): Asyncified<any> => {
  const { type, value } = transferredApi
  if (type === 'primitive') {
    return value
  } else if (type === 'function') {
    return async (...args: any[]): Promise<Asyncified<any>> => await new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.addEventListener('messageerror', reject, { once: true })
      messageChannel.port1.addEventListener('message', e => {
        resolve(browserSideApi(e.data))
      }, { once: true })
      messageChannel.port1.start()
      ;(value as MessagePort).postMessage(args, [messageChannel.port2])
    })
  } else if (type === 'array') {
    return (value as any[]).map(value => transferredApi(value))
  } else if (type === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, value]) =>
      [key, browserSideApi(value)]))
  } else {
    throw new Error(`Cannot handle data with type: '${type as string}'`)
  }
}

export default browserSideApi
