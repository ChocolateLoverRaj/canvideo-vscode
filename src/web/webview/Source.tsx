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

const loadingValidation: ValidationFeedback = {
  icon: 'Loading',
  message: 'Loading File'
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
  const loaded = canvideoFileStore.contents !== undefined
  const validation = loaded
    ? isGoodSourceExtension(canvideoFileStore.contents as string)
      ? fileExistsStateValidation[fileExistsStore.state]
      : badUriValidation
    : loadingValidation

  return (
    <>
      <TextField
        disabled={!loaded}
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
