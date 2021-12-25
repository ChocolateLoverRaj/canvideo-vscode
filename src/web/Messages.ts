export interface Message<T, D> {
  type: T
  data: D
}

export enum MessageToWebviewType {
  CHANGED,
  CHECK_FILE_RESULT
}

export type ChangedMessage = Message<MessageToWebviewType.CHANGED, string>

export enum CheckFileResult {
  NO_EXIST,
  FILE,
  DIRECTORY
}

export type CheckFileResultMessage = Message<MessageToWebviewType.CHECK_FILE_RESULT, CheckFileResult>

export type MessageToWebview = ChangedMessage | CheckFileResultMessage

export enum MessageToVscodeType {
  EDIT,
  CHECK_FILE_EXISTS
}

export type EditMessage = Message<MessageToVscodeType.EDIT, string>

export type CheckFileExistsMessage = Message<MessageToVscodeType.CHECK_FILE_EXISTS, undefined>

export type MessageToVscode = EditMessage | CheckFileExistsMessage
