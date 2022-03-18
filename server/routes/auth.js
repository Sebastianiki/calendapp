const express = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const userController = require('../controllers/user');
const router = express.Router();

router.post(
  '/newuser', 
  [
    check('email', 'El email es obligatario').isEmail(),
    check('password', 'Contraseña insegura, debe tener al menos 8 letras, una mayuscula, un numero y un simbolo').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }),
    validateFields
  ],
  userController.createUser
);

router.post(
  '/login',
  [
    check('email', 'El email es obligatario').isEmail(),
    check('password', 'El password es obligatario').not().isEmpty(),
    validateFields
  ],
  userController.login
);

router.get(
  '/renewjwt',
  validateJWT,
  userController.renewJWT
);

module.exports = router;