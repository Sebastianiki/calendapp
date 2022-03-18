const jwt = require('jsonwebtoken');

exports.validateJWT = (req, res, next) => {
  const token = req.header('x-token');
  if ( !token ) return res.status(400).json({error: true, msg: 'No hay token de validacion'})

  try{
    const { userId } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.userId = userId;
  }catch(error){
    console.log(error)
    return res.status(401).json({error: true, msg: 'token no valido'})
  }
  next();
}