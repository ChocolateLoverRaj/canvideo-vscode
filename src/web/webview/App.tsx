import { FC } from 'react'
import Source from './Source'
import { css } from '@emotion/css'
import VideoPlayer from './VideoPlayer'

const App: FC = () => (
  <div className={css({ display: 'flex', width: '100%', height: '100vh', flexDirection: 'column' })}>
    <div className={css({ flexShrink: 0, flexGrow: 0, flexBasis: 'auto' })}>
      <Source />
    </div>
    <div className={css({ flexShrink: 1, flexGrow: 1, flexBasis: 'auto', backgroundColor: 'orange' })}>
      <VideoPlayer />
    </div>
  </div>
)

export default App
