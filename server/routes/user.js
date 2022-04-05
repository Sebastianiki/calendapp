/* 
  Event Routes
  /api/users
*/
const express = require('express');
const { validateJWT, validateDev } = require('../middlewares/validate-jwt')
const { getUsers, deleteUser } = require('../controllers/user')
const router = express.Router();

router.use(validateJWT);
router.use(validateDev);

router.get(
  '/',
  getUsers
);

router.delete(
  '/:id',
  deleteUser
)

module.exports = router;