import { action, makeObservable, observable } from 'mobx'
import { CheckFileResult, MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from '../Messages'
import vscode from './vscode'

export enum FileExistsState {
  INITIAL,
  /**
   * If file doesn't end with `.js`, don't even check
   */
  INVALID_URI,
  CHECKING,
  DIRECTORY,
  FILE,
  NO_EXIST
}

class FileExists {
  state = FileExistsState.INITIAL

  constructor () {
    makeObservable(this, {
      state: observable,
      check: action
    })

    addEventListener('message', action(({ data: { type, data } }: MessageEvent<MessageToWebview>) => {
      if (type === MessageToWebviewType.CHECK_FILE_RESULT) {
        this.state = data === CheckFileResult.FILE
          ? FileExistsState.FILE
          : data === CheckFileResult.NO_EXIST
            ? FileExistsState.NO_EXIST
            : FileExistsState.DIRECTORY
      }
    }))
  }

  check (): void {
    const message: MessageToVscode = {
      type: MessageToVscodeType.CHECK_FILE_EXISTS,
      data: undefined
    }
    vscode.postMessage(message)
    this.state = FileExistsState.CHECKING
  }
}

export default FileExists
