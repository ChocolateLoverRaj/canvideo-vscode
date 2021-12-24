import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements  {
      'vscode-text-field': VscodeTextFieldAttributes
    }

    interface VscodeTextFieldAttributes {
      children: string
      onchange?: (e: InputEvent) => void
      value: string
    }
  }
}
