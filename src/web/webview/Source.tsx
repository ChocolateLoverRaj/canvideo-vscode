import { observer } from 'mobx-react-lite'
import canvideoFileStore from './canvideoFileStore'
import { TextField } from './vscode-ui-react'
import { css } from '@emotion/css'
import fileExistsStore from './fileExistsStore'
import { FileExistsState } from './FileExists'
import { ReactNode } from 'react'

interface ValidationFeedback {
  icon: ReactNode
  message?: ReactNode
}

const fileExistsStateValidation: Partial<Record<FileExistsState, ValidationFeedback>> = {
  [FileExistsState.FILE]: {
    icon: '\u{2714}'
  },
  [FileExistsState.DIRECTORY]: {
    icon: '\u{1F4C1}',
    message: 'That path is a directory'
  },
  [FileExistsState.CHECKING]: {
    icon: 'Checking'
  },
  [FileExistsState.INVALID_URI]: {
    icon: '\u{274C}',
    message: <>File must end in <code>.js</code></>
  },
  [FileExistsState.NO_EXIST]: {
    icon: '\u{274C}',
    message: "That file doesn't exist"
  }
}

const Source = observer(() => {
  const validation = fileExistsStateValidation[fileExistsStore.state]

  return (
    <>
      <TextField
        value={canvideoFileStore.contents}
        onChange={e => {
          canvideoFileStore.contents = e.target.value
        }}
        placeholder="A relative path to a js module, like './code.js'"
        endIcon={validation?.icon}
      >
        Source
      </TextField>
      {validation?.message !== undefined && (
        <>
          <br />
          <span className={css({ color: 'red ' })}>{validation.message}</span>
        </>)}
    </>
  )
})

export default Source
