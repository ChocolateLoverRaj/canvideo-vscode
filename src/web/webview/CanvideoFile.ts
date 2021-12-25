import { makeObservable, observable, computed, action, autorun, runInAction } from 'mobx'
import { MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from '../Messages'
import { FileExistsState } from './FileExists'
import fileExistsStore from './fileExistsStore'
import vscode from './vscode'

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
        this._contents = data as string
      }
    }))

    autorun(() => {
      if (this.goodExtension) fileExistsStore.check()
      else {
        runInAction(() => {
          fileExistsStore.state = FileExistsState.INVALID_URI
        })
      }
    })
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
  }

  get goodExtension (): boolean {
    return this.contents.endsWith('.js')
  }
}

export default CanvideoFile
