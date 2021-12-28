import { createAtom } from 'mobx'
import { MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType, ReadThisFileSubscribeMessage } from '../Messages'
import vscode from './vscode'
import never from 'never'

class CanvideoFile {
  _contents: string | undefined = undefined

  readonly messageHandler = (e: MessageEvent<MessageToWebview>) => {
    const { data, type } = e.data
    if (type === MessageToWebviewType.READ_FILE_FILE_RESULT) {
      this._contents = data as string
      this.atom.reportChanged()
    }
  }

  readonly atom = createAtom(
    CanvideoFile.name,
    () => {
      addEventListener('message', this.messageHandler)
      const message: ReadThisFileSubscribeMessage = {
        type: MessageToVscodeType.READ_THIS_FILE_SUBSCRIBE,
        data: true
      }
      postMessage(message)
    },
    () => {
      removeEventListener('message', this.messageHandler)
      const message: ReadThisFileSubscribeMessage = {
        type: MessageToVscodeType.READ_THIS_FILE_SUBSCRIBE,
        data: false
      }
      postMessage(message)
    })

  get contents (): string | undefined {
    this.atom.reportObserved()
    return this._contents
  }

  set contents (contents) {
    const message: MessageToVscode = {
      type: MessageToVscodeType.EDIT,
      data: contents ?? never('Cannot set undefined contents')
    }
    vscode.postMessage(message)
  }
}

export default CanvideoFile
