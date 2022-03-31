import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseSnackBar } from '../../actions/ui';

const CustomSnackBar = () => {

  const { snackBar } = useSelector( state => state.ui)
  const dispatch = useDispatch();
  if( !snackBar ) return <></>;

  const { anchor, show, severity, msg} = snackBar;

  console.log(snackBar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch(uiCloseSnackBar())
  };

  return (
    <Snackbar
      anchorOrigin={anchor ? anchor : { vertical : 'top', horizontal: 'right' }}
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar
