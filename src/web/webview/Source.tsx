import { observer } from 'mobx-react-lite'
import canvideoFileStore from './canvideoFileStore'
import { TextField } from './vscode-ui-react'

const Source = observer(() => {
  return (
    <TextField
      value={canvideoFileStore.contents}
      onChange={e => {
        canvideoFileStore.contents = e.target.value
      }}
      placeholder="A relative path to a js module, like './code.js'"
    >
      Source
    </TextField>
  )
})

export default Source
