import { types } from "../../types/types"

describe('Pruebas en types', () => {
  test('los types deben de ser iguales', () => {
    expect( types ).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
      uiOpenSnackBar: '[ui] Open SnackBar',
      uiCloseSnackBar: '[ui] Close CloseBar',
    
      getEvents: '[event] Get events from api',
      getEventsSuccess: '[event] Get events Success',
      getEventsFail: '[event] Get events Fail',
      eventAddNew: '[event] Add new',
      eventAddNewSuccess: '[event] Add new Success',
      eventAddNewFail: '[event] Add new Fail',
      eventSetActive: '[event] Set active',
      eventCleanActive: '[event] Clean active',
      eventUpdate: '[event] Event update',
      eventUpdateSuccess: '[event] Event update success',
      eventUpdateFail: '[event] Event update fail',
      eventDelete: '[event] Event delete',
      eventDeleteSuccess: '[event] Event delete success',
      eventDeleteFail: '[event] Event delete fail',
    
      authCheckJWT: '[auth] Check login state',
      authCheckJWTSuccess: '[auth] Check JWT success',
      authLogin: '[auth] Login',
      authLoginSuccess: '[auth] Login success',
      authLoginFail: '[auth] Login fail',
      authRegister: '[auth] Register',
      authRegisterSuccess: '[auth] Register success',
      authRegisterFail: '[auth] Register fail',
      authLogout: '[auth] Logout'
    })
  })
})