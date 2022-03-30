import axiosWT from "../config/axiosWithToken"
import { types } from "../types/types"

export const eventGetEvents = () => {
  return async(dispatch) => {
    dispatch(getEvents())
    try {
      const resp = await axiosWT.get('events');
      const { error, events} = resp.data
      if ( !error ) {
        dispatch(getEventsSuccess(events))
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
      console.log(resp);
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

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventCleanActive = () => ({ type: types.eventCleanActive });

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

export const eventDeleted = () => ({ type: types.eventDeleted })