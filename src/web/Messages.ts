export interface Message<T, D> {
  type: T
  data: D
}

export enum MessageToWebviewType {
  CHANGED
}

export type ChangedMessage = Message<MessageToWebviewType.CHANGED, string>

export type MessageToWebview = ChangedMessage

export enum MessageToVscodeType {
  EDIT
}

export type EditMessage = Message<MessageToVscodeType.EDIT, string>

export type MessageToVscode = EditMessage
