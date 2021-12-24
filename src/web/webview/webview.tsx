import { allComponents } from '@vscode/webview-ui-toolkit/dist/toolkit'
import { render } from 'react-dom'
import App from './App'

allComponents.register()
render(<App />, document.getElementById('app'))
