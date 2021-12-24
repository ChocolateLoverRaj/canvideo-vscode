import { observer } from 'mobx-react-lite'
import canvideoFileStore from './canvideoFileStore'

const Source = observer(() => {
  return (
    <label>
      Source
      <input
        value={canvideoFileStore.contents}
        onChange={e => {
          canvideoFileStore.contents = e.target.value
        }}
      />
    </label>
  )
})

export default Source
