'use client'

import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface FormInputProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'number' | 'date' | 'password'
  isRequired?: boolean
  isTextarea?: boolean
  disabled?: boolean
  className?: string
}

export const FormInput = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  isRequired = false,
  isTextarea = false,
  className,
}: FormInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-sm">
              {label}
              {isRequired && (
                <strong className="font-semibold text-red-500">*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder || 'Digite aqui...'}
                disabled={disabled}
                className={className}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder || 'Digite aqui...'}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
