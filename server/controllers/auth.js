const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if( !user ) return res.status(400).json({ error: true, msg: 'Correo y/o password incorrectos'});

    const validatePassword = bcrypt.compareSync( password, user.password );
    if( !validatePassword ) return res.status(400).json({ error: true, msg: 'Correo y/o password incorrectos'});

    
    const token = await generateJWT(user.id)

    const userValidated = await User.scope('withOutPassword').findByPk(user.id)
    
    res.status(200).json({
      error: false,
      msg: 'Usuario logeado exitosamente.',
      token,
      user : userValidated
    });
  }catch(error){
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.renewJWT = async (req, res) => {
  try{
    const { userId } = req
    const token = await generateJWT(userId)
    const user = await User.scope('withOutPassword').findByPk(userId);

    res.status(200).json({
      error: false,
      msg: 'renewJWT',
      token,
      user
    });
    
  }catch(error){
    res.status(500).send('Ha ocurrido un error');
  }
}