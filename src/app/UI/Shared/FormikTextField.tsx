/* eslint-disable react/require-default-props */
'use client'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, Stack, TextField, Typography as T } from '@mui/material'
import { useFormikContext, FieldInputProps } from 'formik'
import { useState } from 'react'

interface FormikTextFieldProps {
  variant?: 'standard' | 'filled' | 'outlined'
  field: FieldInputProps<any>
  password?: boolean
  [key: string]: any
}

const FormikTextField = ({ variant = 'standard', field, password, ...props }: FormikTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { errors, setFieldValue }: any = useFormikContext()
  return (
    <Stack spacing={1}>
      <TextField
        {...props}
        error={Boolean(errors[field?.name])}
        variant={variant}
        name={field?.name}
        value={field?.value ?? ''}
        onChange={({ target }) => setFieldValue(field?.name, target.value)}
        slotProps={
          password
            ? {
              input: {
                type: password && !showPassword ? 'password' : 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }
            : undefined
        }
      />
      {errors[field?.name] ? <T color="error">{errors[field?.name]}</T> : null}
    </Stack>
  )
}

export default FormikTextField