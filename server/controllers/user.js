const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

exports.createUser = async (req, res) => {
  try{
    let { email, password, name } = req.body;
    let user = await User.findOne({ where: { email } });

    if( user ) return res.status(400).json({ error: true, msg: 'Ya existe un usuario con ese correo electronico'});

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync( password, salt );
    user = await User.create({ email, password, name });

    const token = await generateJWT(user.id)

    const userValidated = await User.scope('withOutPassword').findByPk(user.id);

    res.status(200).json({
        error: false,
        msg: 'Usuario registrado exitosamente.',
        token,
        user : userValidated
    });
  }catch(error){
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.scope('withOutPassword').findAll()
    res.status(200).json({
      error: false,
      users
    })
  } catch (error) {
    console.log(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)

    if(!user) {
      return res.status(404).json({
        error: true,
        msg: 'usuario no encontrado'
      })
    }
     
    await User.destroy({ where : { id }, force: true })

    res.status(200).json({
      error: false,
      msg: 'usuario borrado exitosamente'
    });
  } catch (error) {
    res.status(500).send('Ha ocurrido un error');
  }
}