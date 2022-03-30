import moment from "moment";
import { types } from "../types/types"

const initialState = {
  events: [],
  activeEvent: null,
  loading: false
};

export const calendarReducer = (state = initialState, action ) => {
  switch(action.type){
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.getEvents:
      return {
        ...state,
        loading: true
      }
    case types.getEventsSuccess:
      return {
        ...state,
        loading: false,
        events: action.payload
      }
    case types.getEventsFail:
      return {
        ...state,
        loading: false
      }
    case types.eventAddNew:
      return {
        ...state,
        loading: true
      }
    case types.eventAddNewSuccess:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false
      }
    case types.eventAddNewFail:
      return {
        ...state,
        loading: false
      }
    case types.eventCleanActive:
      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(e => e.id === action.payload.id ? action.payload : e)
      }
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e => e.id !== state.activeEvent.id),
        activeEvent: null
      }
    default:
      return state;
  }
}