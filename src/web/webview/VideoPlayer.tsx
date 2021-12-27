import { FC } from 'react'
import { css } from '@emotion/css'
import Controls from './Controls'
import Canvas from './Canvas'

const VideoPlayer: FC = () => {
  return (
    <div className={css({ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' })}>
      <div className={css({ flexShrink: 1, flexGrow: 1, flexBasis: 'auto' })}>
        <Canvas />
      </div>
      <div className={css({ flexShrink: 0, flexGrow: 0, flexBasis: 'auto', backgroundColor: 'red' })}>
        <Controls />
      </div>
    </div>
  )
}

export default VideoPlayer
