import Asyncified from './Asyncified'
import browserSideApi from './browserSideApi'
import getWorkerScript from './getWorkerScript'

const importFromWebWorker = async <T>(moduleString: string): Promise<Asyncified<T>> => {
  const workerString = getWorkerScript(moduleString)
  const blob = new Blob([workerString])
  const workerUrl = URL.createObjectURL(blob)
  const worker = new Worker(workerUrl)
  return await new Promise((resolve, reject) => {
    worker.addEventListener('error', e => {
      reject(e)
    }, { once: true })
    worker.addEventListener('message', e => {
      resolve(browserSideApi(e.data))
    }, { once: true })
  })
}

export default importFromWebWorker
