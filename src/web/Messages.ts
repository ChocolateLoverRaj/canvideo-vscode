export interface Message<T, D> {
  type: T
  data: D
}

export enum MessageToWebviewType {
  CHANGED,
  CHECK_FILE_RESULT,
  READ_FILE_RESULT
}

export type ChangedMessage = Message<MessageToWebviewType.CHANGED, string>

export enum CheckFileResult {
  NO_EXIST,
  FILE,
  DIRECTORY
}

export type CheckFileResultMessage = Message<MessageToWebviewType.CHECK_FILE_RESULT, CheckFileResult>

export type ReadFileResultMessage = Message<MessageToWebviewType.READ_FILE_RESULT, Uint8Array | undefined>

export type MessageToWebview = ChangedMessage | CheckFileResultMessage | ReadFileResultMessage

export enum MessageToVscodeType {
  EDIT,
  CHECK_FILE_SUBSCRIBE,
  READ_FILE_SUBSCRIBE
}

export type EditMessage = Message<MessageToVscodeType.EDIT, string>

export type CheckFileExistsMessage = Message<MessageToVscodeType.CHECK_FILE_SUBSCRIBE, boolean>

export type ReadFileSubscribeMessage = Message<MessageToVscodeType.READ_FILE_SUBSCRIBE, boolean>

export type MessageToVscode = EditMessage | CheckFileExistsMessage | ReadFileSubscribeMessage
