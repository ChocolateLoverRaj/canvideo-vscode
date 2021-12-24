import { makeObservable, observable, computed, action } from 'mobx'

const vscode = acquireVsCodeApi()

class CanvideoFile {
  _contents = ''

  constructor () {
    makeObservable(this, {
      _contents: observable,
      contents: computed
    })

    addEventListener('message', action(e => {
      this._contents = e.data
    }))
  }

  get contents (): string {
    return this._contents
  }

  set contents (contents) {
    vscode.postMessage(contents)
    this._contents = contents
  }
}

export default CanvideoFile
