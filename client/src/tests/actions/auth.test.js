import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { authLogin, authRegister } from '../../actions/auth';
import { types } from '../../types/types';
import axiosWT from '../../config/axiosWithToken';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones del auth', () => {

  let token;

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('Login correcto', async() => {
    
    await store.dispatch( authLogin('hola@sebastianreyes.cl', 'Sebastian123#') );
    
    const actions = store.getActions();

    expect( actions[0]).toEqual({
      type: types.authLogin,
    });

    expect( actions[1]).toEqual({
      type: types.authLoginSuccess,
      payload: {
        id: expect.any(Number),
        email: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    })

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))
    token = localStorage.setItem.mock.calls[0][1]
  });

  test('Login incorrecto', async() => {
    
    await store.dispatch( authLogin('hola@sebastianreyes.cl', 'seba123#') );
    
    const actions = store.getActions();

    expect( actions[0]).toEqual({
      type: types.authLogin,
    });

    expect( actions[1]).toEqual({
      type: types.authLoginFail,
      payload: {
        error: true,
        msg: expect.any(String),
      }
    })
  });

  test('Register correcto', async() => {

    await store.dispatch( authRegister('test', 'test@test.cl', 'Test123#'))
    const actions = store.getActions()

    expect( actions[0]).toEqual({
      type: types.authRegister,
    });

    expect( actions[1]).toEqual({
      type: types.authRegisterSuccess,
      payload: {
        id: expect.any(Number),
        email: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    })
    const userToDelete = actions[1].payload.id
    
    const resp = await axiosWT.delete(`users/${userToDelete}`, {  headers: { 'x-token': token } })
    expect(resp.status).toBe(200);
  });
})