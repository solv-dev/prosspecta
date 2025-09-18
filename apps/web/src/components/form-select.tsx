import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export type SelectInputItem = {
  label: string
  value: string
}

interface SelectInputProps {
  items: SelectInputItem[]
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'number'
  isRequired?: boolean
  className?: string
}

export const FormSelect = ({
  items,
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
}: SelectInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {isRequired && (
                <strong className='font-semibold text-red-500'>*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={value => {
                field.onChange(value)
              }}
            >
              <SelectTrigger
                className='h-10 w-full cursor-pointer'
                aria-invalid={!!fieldState.error}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
