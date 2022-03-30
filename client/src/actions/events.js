import axiosWT from "../config/axiosWithToken"
import { stringToDate } from "../helpers/commonHelpers"
import { types } from "../types/types"

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

const addNewSuccess = (event) => ({
  type: types.eventAddNewSuccess,
  payload: event
});

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
      dispatch(updateFail());
    }
  }
}

const update = () => ({ type: types.eventUpdate })

const updateSuccess = (event) => ({ type: types.eventUpdateSuccess, payload: event })

const updateFail = () => ({ type: types.eventUpdateFail })

export const eventDeleted = () => ({ type: types.eventDeleted })

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventCleanActive = () => ({ type: types.eventCleanActive });