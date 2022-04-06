const jwt = require('jsonwebtoken')

exports.generateJWT = ( userId ) =>{
  return new Promise( (resolve, reject) => {
    const payload = { userId };
    jwt.sign( payload, process.env.SECRET_JWT_SEED, { expiresIn: '48h' } , (err, token) => {
      if(err){
        reject('No se pudo generar el token')
      }
      resolve(token);
    })
  });
}