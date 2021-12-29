import { css } from '@emotion/css'
import { FC } from 'react'
import { Button } from './vscode-ui-react'

const Controls: FC = () => {
  return (
    <div className={css({ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
      <Button>{'\u{25B6}'}</Button>
    </div>
  )
}

export default Controls
