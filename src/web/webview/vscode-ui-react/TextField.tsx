import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useRef, useEffect, useLayoutEffect, ReactNode } from 'react'

export interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  endIcon?: ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  onChange,
  value,
  children,
  endIcon,
  ...restProps
}, givenRef) => {
  const ref = givenRef ?? useRef<HTMLInputElement>(null)

  useEffect(() => {
    (ref as any).current.oninput = onChange
  }, [])

  useLayoutEffect(() => {
    (ref as any).current.value = value
  }, [value])

  return (
    <vscode-text-field
      ref={ref}
      value={value}
      {...restProps as any}
    >
      {children}
      {Boolean(endIcon) && <span slot='end'>{endIcon}</span>}
    </vscode-text-field>
  )
})

export default TextField
