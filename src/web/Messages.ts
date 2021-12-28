export interface Message<T, D> {
  type: T
  data: D
}

export enum MessageToWebviewType {
  READ_FILE_FILE_RESULT,
  CHECK_FILE_RESULT,
  READ_SOURCE_FILE_RESULT
}

export type ReadThisFileResultMessage = Message<MessageToWebviewType.READ_FILE_FILE_RESULT, string>

export enum CheckFileResult {
  NO_EXIST,
  FILE,
  DIRECTORY
}

export type CheckFileResultMessage = Message<MessageToWebviewType.CHECK_FILE_RESULT, CheckFileResult>

export type ReadFileResultMessage = Message<MessageToWebviewType.READ_SOURCE_FILE_RESULT, Uint8Array | undefined>

export type MessageToWebview = ReadThisFileResultMessage | CheckFileResultMessage | ReadFileResultMessage

export enum MessageToVscodeType {
  EDIT,
  CHECK_FILE_SUBSCRIBE,
  READ_SOURCE_FILE_SUBSCRIBE,
  READ_THIS_FILE_SUBSCRIBE
}

export type EditMessage = Message<MessageToVscodeType.EDIT, string>

export type CheckFileExistsMessage = Message<MessageToVscodeType.CHECK_FILE_SUBSCRIBE, boolean>

export type ReadSourceFileSubscribeMessage = Message<MessageToVscodeType.READ_SOURCE_FILE_SUBSCRIBE, boolean>

export type ReadThisFileSubscribeMessage = Message<MessageToVscodeType.READ_THIS_FILE_SUBSCRIBE, boolean>

export type MessageToVscode =
  EditMessage |
  CheckFileExistsMessage |
  ReadSourceFileSubscribeMessage |
  ReadThisFileSubscribeMessage
