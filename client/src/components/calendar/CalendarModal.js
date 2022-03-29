import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventCleanActive, eventUpdated } from '../../actions/events';

const now = moment().minutes(0).seconds(0).add(1,'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: now.add(1,'hours').toDate()
}

export const CalendarModal = () => {

  const { modalOpen } = useSelector( state => state.ui )
  const { activeEvent } = useSelector( state => state.calendar )
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(now.toDate())
  const [endDate, setEndDate] = useState(now.add(1,'hours').toDate())
  const [formValues, setFormValues] = useState(initEvent)
  const [errorsForm, setErrorsForm] = useState({
    title: { error: false, msg: ''},
    end: { error: false, msg: ''},
  })

  const { title, notes, start, end} = formValues;

  useEffect(() => {
    if( activeEvent ) setFormValues(activeEvent)
    else setFormValues(initEvent)
  }, [activeEvent])
  

  const handleTextFieldChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSubmitForm = () => {

    const momentStart = moment(start);
    const momentEnd = moment(end);

    let errors = {
      title: { error: false, msg: ''},
      end: { error: false, msg: ''},
    }

    if(formValues.title === '') errors = { ...errors, title: { error: true, msg: 'El titulo es obligatorio' } }
    if(momentStart.isSameOrAfter(momentEnd)) errors = { ...errors, end: { error: true, msg: 'La fecha no puede ser menor a la fecha de inicio' } }

    if(errors.title.error || errors.end.error) {
      setErrorsForm(errors);
      return
    }

    setErrorsForm({
      title: { error: false, msg: ''},
      end: { error: false, msg: ''},
    })

    if( activeEvent ) dispatch( eventUpdated(formValues));
    else dispatch(eventAddNew({ ...formValues, id: new Date().getTime(), user: {id: '123', name: 'Sebastian' } }))
    handleCloseModal();
  }

  const handleCloseModal = () => {
    setFormValues(initEvent);
    dispatch( eventCleanActive() );
    dispatch( uiCloseModal() );
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ textAlign:'center'}}>{ activeEvent ? 'Editar evento' : 'Nuevo Evento'}</DialogTitle>
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
                error={true}
                helperText={errorsForm.end.msg}
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
            helperText={errorsForm.title.msg}
            name='title'
            label="TITULO"
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
