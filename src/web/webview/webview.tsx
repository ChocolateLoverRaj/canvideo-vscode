import { allComponents } from '@vscode/webview-ui-toolkit/dist/toolkit'
import { render } from 'react-dom'
import App from './App'

allComponents.register()
document.body.style.padding = '0'
render(<App />, document.getElementById('app'))
