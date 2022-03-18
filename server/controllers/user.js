const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

exports.createUser = async (req, res) => {
    try{
        let { email, password } = req.body;
        let user = await User.findOne({ where: { email } });

        if( user ) return res.status(400).json({ error: true, msg: 'Ya existe un usuario con ese correo electronico'});

        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync( password, salt );
        user = await User.create({ email, password });

        const token = await generateJWT(user.id)

        res.status(200).json({
            error: false,
            msg: 'Usuario registrado exitosamente.',
            user,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
}

exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if( !user ) return res.status(400).json({ error: true, msg: 'correo malo'});

    const validatePassword = bcrypt.compareSync( password, user.password );
    if( !validatePassword ) return res.status(400).json({ error: true, msg: 'password mala'});

    const token = await generateJWT(user.id)

    res.status(200).json({
      error: false,
      msg: 'Usuario logeado exitosamente.',
      token
    });
  }catch(error){
    console.log(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.renewJWT = async (req, res) => {
  try{
    const { userId } = req
    const token = await generateJWT(userId)

    res.status(200).json({
      error: false,
      msg: 'renewJWT',
      token
    });
    
  }catch(error){
    console.log(error);
    res.status(500).send('Ha ocurrido un error');
  }
}