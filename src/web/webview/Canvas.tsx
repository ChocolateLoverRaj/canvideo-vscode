import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import sourceFileContentStore from './source-file-content'

const Canvas = observer(() => {
  useEffect(() => autorun(() => {
    if (sourceFileContentStore.contents === undefined) return
    console.log(sourceFileContentStore.contents)
    const blob = new Blob(['self.postMessage("Message from worker")'])
    const uri = URL.createObjectURL(blob)
    new Worker(uri).addEventListener('message', e => {
      console.log(e)
    })
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
