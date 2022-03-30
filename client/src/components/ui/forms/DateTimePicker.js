import React from 'react'
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useField, useFormikContext } from 'formik';
import Textfield from './Textfield';
import moment from 'moment'

const DateTimePickerCustom = React.memo(({ name, ...otherProps }) => {

  const [field] = useField(name)
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (evt) => {
    setFieldTouched(name);
    setFieldValue(name,moment(evt));
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        renderInput={(props) => (
          <Textfield
            name={name}
            {...props}
          />
        )}
        {...otherProps}
        value={field.value}
        onChange={handleChange}
        ampm={true}
        ampmInClock={true}
      />
    </LocalizationProvider>
  )
})

export default DateTimePickerCustom