// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { CustomTextEditorProvider } from 'vscode'
import { CheckFileResult, CheckFileResultMessage, MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType, ReadFileResultMessage } from './Messages'
import webviewHtml from './webview/webview.html'
import { resolve, dirname } from 'path'
import Watcher, { WatchCallback as WatcherCallback } from './Watcher'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate (context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "canvideo" is now active in the web extension host!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('canvideo.helloWorld', async () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    await vscode.window.showInformationMessage('Hello')
  })

  const editorProvider: CustomTextEditorProvider = {
    resolveCustomTextEditor: async (document, webviewPanel, token) => {
      const sendUpdatedDocument = async (): Promise<void> => {
        const message: MessageToWebview = {
          type: MessageToWebviewType.CHANGED,
          data: document.getText()
        }
        await webviewPanel.webview.postMessage(message)
      }

      const getFileUri = (): vscode.Uri => {
        const path = resolve(dirname(document.uri.path), document.getText())
        return document.uri.with({ path })
      }

      const watcher = new Watcher(getFileUri().fsPath)

      const sendFileExists = async (): Promise<void> => {
        let stats
        try {
          stats = await vscode.workspace.fs.stat(getFileUri())
        } catch (e: any) {
          if (e.code === 'FileNotFound') {
            const message: MessageToWebview = {
              type: MessageToWebviewType.CHECK_FILE_RESULT,
              data: CheckFileResult.NO_EXIST
            }
            await webviewPanel.webview.postMessage(message)
          } else throw e
        }
        if (stats !== undefined) {
          const message: MessageToWebview = {
            type: MessageToWebviewType.CHECK_FILE_RESULT,
            data: stats.type === vscode.FileType.File
              ? CheckFileResult.FILE
              : CheckFileResult.DIRECTORY
          }
          await webviewPanel.webview.postMessage(message)
        }
      }

      const fileExistsCallback: WatcherCallback = watcher => {
        watcher.onDidCreate(async () => {
          await sendFileExists()
        })
        watcher.onDidDelete(async () => {
          const message: CheckFileResultMessage = {
            type: MessageToWebviewType.CHECK_FILE_RESULT,
            data: CheckFileResult.NO_EXIST
          }
          await webviewPanel.webview.postMessage(message)
        })
      }

      const sendFile = async (): Promise<void> => {
        const message: MessageToWebview = {
          type: MessageToWebviewType.READ_FILE_RESULT,
          data: await vscode.workspace.fs.readFile(getFileUri())
        }
        await webviewPanel.webview.postMessage(message)
      }

      const sendFileCallback: WatcherCallback = watcher => {
        watcher.onDidCreate(async () => {
          await sendFile()
        })
        watcher.onDidChange(async () => {
          await sendFile()
        })
        watcher.onDidDelete(async () => {
          const message: ReadFileResultMessage = {
            type: MessageToWebviewType.READ_FILE_RESULT,
            data: undefined
          }
          await webviewPanel.webview.postMessage(message)
        })
      }

      webviewPanel.webview.options = {
        enableScripts: true
      }
      webviewPanel.webview.html = webviewHtml
      webviewPanel.webview.onDidReceiveMessage(async ({ data, type }: MessageToVscode) => {
        if (type === MessageToVscodeType.EDIT) {
          const newContents = data as string
          // Just replace the entire document every time for this example extension.
          // A more complete extension should compute minimal edits instead.
          const edit = new vscode.WorkspaceEdit()
          edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), newContents)
          await vscode.workspace.applyEdit(edit)
        } else if (type === MessageToVscodeType.CHECK_FILE_SUBSCRIBE) {
          if (data as boolean) {
            await sendFileExists()
            watcher.add(fileExistsCallback)
          } else {
            watcher.delete(fileExistsCallback)
          }
        } else if (type === MessageToVscodeType.READ_FILE_SUBSCRIBE) {
          if (data as boolean) {
            await sendFile()
            watcher.add(sendFileCallback)
          } else {
            watcher.delete(sendFileCallback)
          }
        }
      })

      // Hook up event handlers so that we can synchronize the webview with the text document.
      //
      // The text document acts as our model, so we have to sync change in the document to our
      // editor and sync changes in the editor back to the document.
      //
      // Remember that a single text document can also be shared between multiple custom
      // editors (this happens for example when you split a custom editor)
      const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(async e => {
        // Check that this our document was the one that was changed
        if (e.document.uri.toString() === document.uri.toString()) {
          watcher.setPath(getFileUri().fsPath)
          await Promise.all([
            sendUpdatedDocument(),
            sendFileExists(),
            sendFile()
          ])
        }
      })

      // Make sure we get rid of the listener when our editor is closed.
      webviewPanel.onDidDispose(() => {
        changeDocumentSubscription.dispose()
      })

      await sendUpdatedDocument()
    }
  }
  const disposable2 = vscode.window.registerCustomEditorProvider('canvideo.canvideo', editorProvider)

  context.subscriptions.push(disposable)
  context.subscriptions.push(disposable2)
}

// this method is called when your extension is deactivated
export function deactivate (): void {}
