import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  Box,
  Fab,
  Tooltip
} from '@mui/material';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActive, eventSetActive, eventDeleted } from '../../actions/events';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

moment.locale('es');
const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar )

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() );
  };

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) );
  }

  const onSelectSlot = (e) => {
    dispatch( eventCleanActive() );
  }

  const onViewChange = (e) => {
    setlastView(e)
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      opacity: '0.8',
      display: 'block',
      color: 'white'
    }
    return { style }
  };

  const addNewEvent = () => {
    dispatch( eventCleanActive() )
    dispatch( uiOpenModal() )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar/>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 , mx: 5, my: 5 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable={true}
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarEvent
          }}
        />
      </Box>
      <CalendarModal/>
      <Tooltip title="Add Event" placement="top">
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 0, right: 0, mr: 5, mb: 5}} onClick={addNewEvent}>
          <AddIcon />
        </Fab>
      </Tooltip>
      { activeEvent && (
        <Fab color="secondary" aria-label="delete" sx={{ position: 'fixed', bottom: 0, right: 0, mr: 5, mb: 13}} 
          onClick={() => dispatch( eventDeleted() )}>
          <DeleteIcon />
        </Fab>
      )}
    </Box>
  )
}
