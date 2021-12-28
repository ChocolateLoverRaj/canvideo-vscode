import { createAtom } from 'mobx'
import { MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from '../../Messages'
import vscode from '../vscode'

class SourceFileContent {
  _contents: string | undefined = undefined

  readonly messageHandler = ({ data: { type, data } }: MessageEvent<MessageToWebview>) => {
    if (type === MessageToWebviewType.READ_FILE_RESULT) {
      if (data === undefined) {
        this._contents = undefined
      } else {
        this._contents = new TextDecoder().decode(data as Uint8Array)
      }
      this.atom.reportChanged()
    }
  }

  readonly atom = createAtom(
    SourceFileContent.name,
    () => {
      addEventListener('message', this.messageHandler)
      const message: MessageToVscode = {
        type: MessageToVscodeType.READ_FILE_SUBSCRIBE,
        data: true
      }
      vscode.postMessage(message)
    },
    () => {
      this._contents = undefined
      removeEventListener('message', this.messageHandler)
      const message: MessageToVscode = {
        type: MessageToVscodeType.READ_FILE_SUBSCRIBE,
        data: false
      }
      vscode.postMessage(message)
    })

  get contents (): string | undefined {
    this.atom.reportObserved()
    return this._contents
  }
}

export default SourceFileContent
