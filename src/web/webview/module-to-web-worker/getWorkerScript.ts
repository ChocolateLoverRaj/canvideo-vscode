// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import exportFromWebWorkerCode from './exportFromWebWorker.js'

const getWorkerScript = (moduleString: string): string => {
  const exportDefaultStr = 'export default '
  if (!moduleString.startsWith(exportDefaultStr)) {
    throw new Error(`Module must start with '${exportDefaultStr}'`)
  }
  moduleString = moduleString.slice(exportDefaultStr.length)
  const workerCode = `${exportFromWebWorkerCode as string}\nexportFromWebWorker(${moduleString})`
  return workerCode
}

export default getWorkerScript
