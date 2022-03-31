import axiosWT from "../config/axiosWithToken"
import { stringToDate } from "../helpers/commonHelpers"
import { types } from "../types/types"
import { uiOpenSnackBar } from "./ui"

export const eventGetEvents = () => {
  return async(dispatch) => {
    dispatch(getEvents())
    try {
      const resp = await axiosWT.get('events');
      const { error, events} = resp.data
      if ( !error ) {
        const eventsWithDate = events.map((e) => ({ ...e, start: stringToDate(e.start), end: stringToDate(e.end) }) )
        dispatch(getEventsSuccess(eventsWithDate))
      }
    } catch (error) {
      dispatch(getEventsFail())
    }
  }
}

const getEvents = () => ({ type: types.getEvents })

const getEventsSuccess = (events) => ({ type: types.getEventsSuccess, payload: events })

const getEventsFail = () => ({ type: types.getEventsFail })

export const eventAddNew = (values) => {
  return async(dispatch) => {
    dispatch(addNew());
    try {
      const resp = await axiosWT.post('events', values)
      const { error, event } = resp.data
      if( !error ) {
        dispatch( addNewSuccess(event) );
      }
    } catch (error) {
      dispatch(addNewFail())
    }
  }
}

const addNew = () => ({ type: types.eventAddNew })

const addNewSuccess = (event) => ({ type: types.eventAddNewSuccess, payload: event });

const addNewFail = () => ({ type: types.eventAddNewFail })

export const eventUpdate = (values) => {
  return async(dispatch) => {
    dispatch(update())
    try {
      const resp = await axiosWT.put(`events/${values.id}`, values)
      let { error, event } = resp.data
      if ( !error ) {
        event.start = stringToDate(event.start)
        event.end = stringToDate(event.end)
        dispatch ( updateSuccess(event))
      }
    } catch (error) {
      const { msg } = error.response.data
      const snackBar = {
        show: true,
        severity: 'error',
        msg,
      }
      dispatch(uiOpenSnackBar(snackBar))
      dispatch(updateFail());
    }
  }
}

const update = () => ({ type: types.eventUpdate })

const updateSuccess = (event) => ({ type: types.eventUpdateSuccess, payload: event })

const updateFail = () => ({ type: types.eventUpdateFail })

export const eventDelete = (id) => {
  return async(dispatch) => {
    dispatch(deleteEvent())
    try {
      const resp = await axiosWT.delete(`events/${id}`);
      let { error } = resp.data;
      if ( !error ) {
        dispatch(deleteEventSuccess());
      }
    } catch (error) {
      const { msg } = error.response.data
      const snackBar = {
        show: true,
        severity: 'error',
        msg,
      }
      dispatch(uiOpenSnackBar(snackBar))
      dispatch(deleteEventFail());
    }
  }
}

const deleteEvent = () => ({ type: types.eventDelete })

const deleteEventSuccess = () => ({ type: types.eventDeleteSuccess })

const deleteEventFail = () => ({ type: types.eventDeleteFail })

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventCleanActive = () => ({ type: types.eventCleanActive });