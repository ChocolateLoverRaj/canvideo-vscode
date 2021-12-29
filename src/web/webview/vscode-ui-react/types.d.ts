import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements  {
      'vscode-text-field': VscodeTextFieldAttributes
      'vscode-button': any
    }

    interface VscodeTextFieldAttributes {
      children: string
      onchange?: (e: InputEvent) => void
      value: string
    }
  }
}
