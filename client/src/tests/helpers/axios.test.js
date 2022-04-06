import axiosWOT from "../../config/axios";
import axiosWT from '../../config/axiosWithToken'

describe('Pruebas en el helper axios', () => {

  let token = ''

  test('axios sin token debe funcionar', async() => {

    const resp = await axiosWOT.post('auth', { email : 'hola@sebastianreyes.cl' , password: 'Sebastian123#'});
    expect( resp.data ).toHaveProperty('token')
    token = resp.data.token

  });

  test('axios con token debe funcionar', async() => {

    localStorage.setItem('token', token)

    try {
      const resp = await axiosWT.delete(`events/9999`)
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.msg).toBe('Evento no encontrado');
    }
    
  })

});