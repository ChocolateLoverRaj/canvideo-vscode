import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ ...restProps }) => {
  return <vscode-button {...restProps} />
}

export default Button
