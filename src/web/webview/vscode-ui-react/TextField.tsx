import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useRef, useEffect, useLayoutEffect } from 'react'

const TextField = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(({
  onChange,
  value,
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
    />
  )
})

export default TextField
