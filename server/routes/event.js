/* 
  Event Routes
  /api/events
*/

const express = require('express');
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFields } = require('../middlewares/validate-fields')
const { getEvents, newEvent, editEvent, deleteEvent} = require('../controllers/event');
const { isDate } = require('../helpers/isDate');
const router = express.Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'El titulo es obligatario').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de termino es obligatoria').custom(isDate),
    validateFields
  ],
  newEvent);

router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatario').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de termino es obligatoria').custom(isDate),
    validateFields
  ],
  editEvent);

router.delete('/:id', deleteEvent)

module.exports = router;