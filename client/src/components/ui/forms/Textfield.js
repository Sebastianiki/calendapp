import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'

export const Textfield = ({ name, ...otherProps }) => {

  const [field, meta] = useField(name)
  const config = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal',
  }

  if(meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <TextField {...config}/>
  )
}

export default Textfield
