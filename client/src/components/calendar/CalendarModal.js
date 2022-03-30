import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Dialog,
  DialogTitle
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventCleanActive, eventUpdated } from '../../actions/events';
import Textfield from '../ui/forms/Textfield';
import SubmitButton from '../ui/forms/SubmitButton';
import DateTimePickerCustom from '../ui/forms/DateTimePicker';

const initEvent = {
  title: '',
  notes: '',
  start: moment().second(0).add(1,'minutes'),
  end: moment().second(0).add(16,'minutes')
}

export const CalendarModal = () => {

  const { modalOpen } = useSelector( state => state.ui )
  const { activeEvent } = useSelector( state => state.calendar )
  const dispatch = useDispatch();

  const handleSubmitForm = (values) => {
    if( activeEvent ) dispatch( eventUpdated(values));
    else dispatch(eventAddNew({ ...values, id: new Date().getTime(), user: {id: '123', name: 'Sebastian' } }))
    handleCloseModal();
  }

  const handleCloseModal = () => {
    dispatch( eventCleanActive() );
    dispatch( uiCloseModal() );
  }

  const initialFormState = activeEvent ? activeEvent : initEvent

  const formValidation = Yup.object().shape({
    title: Yup.string()
      .required('Required'),
    start: Yup.string()
      .nullable()
      .required('Fecha de inicio obligatoria')
      .test('start','Formato de fecha incorrecto', (value) => {
        return moment(value).isValid()
      })
      .test('start','La fecha de inicio no puede ser menor a la hora actual', (value) => {
        return moment(value).isAfter(moment(Date.now()))
      }),
    end: Yup.string()
      .nullable()
      .required('Fecha de termino obligatoria')
      .test('end','Formato de fecha incorrecto', (value) => {
        return moment(value).isValid()
      })
      .test('end','La fecha de termino no puede ser menor a la fecha de inicio', function(value) {
        return moment(value).isAfter(moment(this.parent.start))
      })
  });

  return (
    <Dialog open={modalOpen} onClose={handleCloseModal}>
      <DialogTitle sx={{ textAlign:'center'}}>{ activeEvent ? 'Editar evento' : 'Nuevo Evento'}</DialogTitle>
      <Box sx={{ mx: 3, mb: 2, display:'flex', flexDirection: 'column', width:'350px'}}>
        <Formik
          initialValues={{...initialFormState}}
          validationSchema={formValidation}
          onSubmit={values => {handleSubmitForm(values)}}
        >
          <Form>
            <DateTimePickerCustom
              name='start'
              label='FECHA Y HORA DE INICIO'
            />
            <DateTimePickerCustom
              name='end'
              label='FECHA Y HORA DE FIN'
            />
            <Textfield
              name='title'
              label='TITULO'
            />
            <Textfield
              name='notes'
              label='Informacion adicional'
              multiline
              rows={4}
            />
            <SubmitButton startIcon={<SaveIcon />} sx={{ mt: 2 }} >GUARDAR</SubmitButton>
          </Form>
        </Formik>
      </Box>
    </Dialog>
  )
}
