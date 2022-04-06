import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext  } from 'formik';

const SubmitButton = ({children, ...otherProps}) => {

  const { submitForm } = useFormikContext();

  const handleSubmit = () => { submitForm(); }

  const config = {
    ...otherProps,
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: handleSubmit
  }

  return(
    <Button {...config} >
      {children}
    </Button>
  )
}

export default SubmitButton;