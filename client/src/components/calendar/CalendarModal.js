import React, {useState} from 'react'
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import { set } from 'express/lib/application';

export const CalendarModal = () => {

  const now = moment().minutes(0).seconds(0).add(1,'hours')

  const [startDate, setStartDate] = useState(now.toDate())
  const [endDate, setEndDate] = useState(now.add(1,'hours').toDate())
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: startDate,
    end: endDate
  })
  const [errorsForm, setErrorsForm] = useState({
    title: { error: false, msg: ''},
    notes: { error: false, msg: ''},
    start: { error: false, msg: ''},
    end: { error: false, msg: ''},
  })

  const { title, notes} = formValues;

  const handleTextFieldChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSubmitForm = () => {

    // const momentStart = moment(formValues.start);
    // const momentEnd = moment(formValues.start);
    // const errors = { ...errorsForm};
    // if(formValues.title === '') errors = { ...errors, title: { error: true, msg: 'El titulo es obligatorio' } }
    // if(momentStart.isSameOrAfter(momentEnd)) errors = { ...errors, end: { error: true, msg: 'La fecha no puede ser menor a la fecha de inicio' } }
    // console.log(errorsForm);
    // console.log(errorsForm);
    // setErrorsForm(errors);
    // if(errorsForm.title.error) {
    //   console.log('enmtro');
    //   return
    // }
    // console.log('paso');
    // setErrorsForm({
    //   title: { error: false, msg: ''},
    //   notes: { error: false, msg: ''},
    //   start: { error: false, msg: ''},
    //   end: { error: false, msg: ''},
    // })
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
      <Dialog open={true}>
        <DialogTitle sx={{ textAlign:'center'}}>Nuevo Evento</DialogTitle>
        <Box sx={{ mx: 3, display:'flex', flexDirection: 'column', width:'350px'}}>
          <DateTimePicker
            renderInput={(props) => 
              <TextField
              margin="normal"
                {...props}
              />
            }
            label="FECHA Y HORA - INICIO"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              setFormValues({
                ...formValues,
                start: newValue.toDate()
              })
            }}
          />
          <DateTimePicker
            renderInput={(props) => 
              <TextField
              margin="normal"
                {...props}
              />
            }
            label="FECHA Y HORA - FIN"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              setFormValues({
                ...formValues,
                end: newValue.toDate()
              });
            }}
          />
          <TextField
            error={errorsForm.title.error}
            required
            name='title'
            label="TITULO"
            helperText={errorsForm.title.msg}
            margin='normal'
            value={title}
            onChange={handleTextFieldChange}
          />
          <TextField
            name='notes'
            label="NOTAS"
            multiline
            rows={4}
            margin='normal'
            helperText="Informacion Adicional"
            value={notes}
            onChange={handleTextFieldChange}
          />
        </Box>
        <DialogActions sx={{ mx: 3, mb: 1 }}>
          <Button fullWidth variant="outlined" startIcon={<SaveIcon />} onClick={handleSubmitForm}>
            GUARDAR
          </Button>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    </div>
  )
}