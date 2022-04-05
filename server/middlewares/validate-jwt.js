const jwt = require('jsonwebtoken');

exports.validateJWT = (req, res, next) => {
  const token = req.header('x-token');
  if ( !token ) return res.status(400).json({error: true, msg: 'No hay token de validacion'});

  try{
    const { userId } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.userId = userId;
  }catch(error){
    return res.status(401).json({error: true, msg: 'token no valido'});
  }
  next();
}

exports.validateDev = (req, res, next) => {

  const devIds = [1]
  const { userId } = req;
  const isDev = devIds.find(id => id === userId)
  if(!isDev) return res.status(401).json({error: true, msg: 'No tiene privilegios para realizar la accion'});
  next();

}