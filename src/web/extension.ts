// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { CustomTextEditorProvider } from 'vscode'
import { MessageToVscode, MessageToVscodeType, MessageToWebview, MessageToWebviewType } from './Messages'
import webviewHtml from './webview/webview.html'

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

      webviewPanel.webview.options = {
        enableScripts: true
      }
      webviewPanel.webview.html = webviewHtml
      webviewPanel.webview.onDidReceiveMessage(async ({ data, type }: MessageToVscode) => {
        if (type === MessageToVscodeType.EDIT) {
        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
          const edit = new vscode.WorkspaceEdit()
          edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), data)
          await vscode.workspace.applyEdit(edit)
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
          await sendUpdatedDocument()
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
