/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, useController, FieldValues, FieldPath } from 'react-hook-form'

export type InputV2Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputV2Props<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valuefromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valuefromInput) || valuefromInput === '')
    if (numberCondition || type !== 'number') {
      //Cập nhật localValue state
      setLocalValue(valuefromInput)
      //gọi field.onChange để cập nhật vào state React hook form
      field.onChange(event)
      //Thực thi onChange callback từ bên ngoài truyền vào Props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
