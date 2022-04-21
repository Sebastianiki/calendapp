import { types } from "../types/types"

const initialState = {
  events: [],
  activeEvent: null,
  loading: false
};

export const calendarReducer = (state = initialState, action ) => {
  switch(action.type){
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
    case types.eventUpdate:
      return {
        ...state,
        loading: true
      }
    case types.eventUpdateSuccess:
      return {
        ...state,
        loading: false,
        events: state.events.map(e => e.id === action.payload.id ? action.payload : e)
      }
    case types.eventUpdateFail:
      return {
        ...state,
        loading: false
      }
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventCleanActive:
      return {
        ...state,
        activeEvent: null
      }
    case types.eventDelete:
      return {
        ...state,
        loading: true
      }
    case types.eventDeleteSuccess:
      return {
        ...state,
        events: state.events.filter(e => e.id !== state.activeEvent.id),
        activeEvent: null,
        loading: false
      }
    case types.eventDeleteFail:
      return {
        ...state,
        activeEvent: null,
        loading: false
      }
    default:
      return state;
  }
}