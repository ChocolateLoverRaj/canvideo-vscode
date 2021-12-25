import { makeObservable, observable, computed, action } from 'mobx'
import { MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from '../Messages'

const vscode = acquireVsCodeApi()

class CanvideoFile {
  _contents = ''

  constructor () {
    makeObservable(this, {
      _contents: observable,
      contents: computed
    })

    addEventListener('message', action((e: MessageEvent<MessageToWebview>) => {
      const { data, type } = e.data
      if (type === MessageToWebviewType.CHANGED) {
        this._contents = data
      }
    }))
  }

  get contents (): string {
    return this._contents
  }

  set contents (contents) {
    const message: MessageToVscode = {
      type: MessageToVscodeType.EDIT,
      data: contents
    }
    vscode.postMessage(message)
    this._contents = contents
  }
}

export default CanvideoFile
