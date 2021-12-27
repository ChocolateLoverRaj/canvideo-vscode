import { observer } from 'mobx-react-lite'
import canvideoFileStore from './canvideoFileStore'
import { TextField } from './vscode-ui-react'
import { css } from '@emotion/css'
import fileExistsStore from './fileExistsStore'
import { FileExistsState } from './FileExists'
import { ReactNode } from 'react'
import isGoodSourceExtension from './isGoodSourceExtension'

interface ValidationFeedback {
  icon: ReactNode
  message?: ReactNode
}

const badUriValidation: ValidationFeedback = {
  icon: '\u{274C}',
  message: <>File must end in <code>.js</code></>
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
  [FileExistsState.NO_EXIST]: {
    icon: '\u{274C}',
    message: "That file doesn't exist"
  }
}

const Source = observer(() => {
  const validation = isGoodSourceExtension(canvideoFileStore.contents)
    ? fileExistsStateValidation[fileExistsStore.state]
    : badUriValidation

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
