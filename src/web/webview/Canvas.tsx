import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { importFromWebWorker } from './module-to-web-worker'
import sourceFileContentStore from './source-file-content'

interface Api {
  size: {
    size: {
      width: number
      height: number
    }
    scale: 'none'
  }
  render: (time: number) => any
}

const Canvas = observer(() => {
  useEffect(() => autorun(async () => {
    if (sourceFileContentStore.contents === undefined) return
    const api = await importFromWebWorker<Api>(sourceFileContentStore.contents)
    console.log(await api.render(1000))
  }))

  return (
    <>
      Canvas goes here
      <code>
        {sourceFileContentStore.contents}
      </code>
    </>
  )
})

export default Canvas
