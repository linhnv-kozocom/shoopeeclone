/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function inputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //Thực thi onChange callback từ bên ngoài truyền vào Props
      onChange && onChange(event)
      //Cập nhật localValue state
      setLocalValue(localValue)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
