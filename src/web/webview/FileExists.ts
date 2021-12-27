import { action, createAtom } from 'mobx'
import { CheckFileResult, MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from '../Messages'
import vscode from './vscode'

export enum FileExistsState {
  CHECKING,
  DIRECTORY,
  FILE,
  NO_EXIST
}

class FileExists {
  _state = FileExistsState.CHECKING

  readonly messageHandler = action(({ data: { type, data } }: MessageEvent<MessageToWebview>) => {
    if (type === MessageToWebviewType.CHECK_FILE_RESULT) {
      this._state = data === CheckFileResult.FILE
        ? FileExistsState.FILE
        : data === CheckFileResult.NO_EXIST
          ? FileExistsState.NO_EXIST
          : FileExistsState.DIRECTORY
      this.atom.reportChanged()
    }
  })

  readonly atom = createAtom(FileExists.name,
    () => {
      addEventListener('message', this.messageHandler)
      const message: MessageToVscode = {
        type: MessageToVscodeType.CHECK_FILE_SUBSCRIBE,
        data: true
      }
      vscode.postMessage(message)
    },
    () => {
      removeEventListener('message', this.messageHandler)
      const message: MessageToVscode = {
        type: MessageToVscodeType.CHECK_FILE_SUBSCRIBE,
        data: false
      }
      vscode.postMessage(message)
    })

  get state (): FileExistsState {
    this.atom.reportObserved()
    return this._state
  }
}

export default FileExists
