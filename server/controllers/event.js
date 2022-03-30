const { Event, User } = require('../models');

exports.getEvents = async (req, res) => {
  try{
    const events = await Event.findAll({
      include: {
        model: User,
        as: 'user',
        attributes:['email', 'name']
      }
    });
    res.status(200).json({
      error: false,
      events
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.newEvent = async (req, res) => {
  try {
    let event = await Event.create({...req.body, userId: req.userId});
    event = await Event.findOne({
      where: {
        id: event.id,
      },
      include: {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password']
        }
      }
    })

    res.status(200).json({
      error: false,
      event
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.editEvent = async (req, res) => {
  const userId = req.userId;
  try {
    const event = await Event.findByPk(req.params.id)
    if(!event) {
      return res.status(404).json({
        error: true,
        msg: 'Evento no encontrado'
      })
    }

    if(event.userId !== userId) {
      return res.status(403).json({
        error: true,
        msg: 'No tiene privilegios para hacer esto'
      })
    }
    const newEvent = {...req.body, userId: req.userId}

    const eventUpdated = await Event.update(newEvent, { where : { id : req.params.id } })

    res.status(200).json({
      error: false,
      msg: 'Evento editado correctamente',
      eventUpdated
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.deleteEvent = async (req, res) => {
  const userId = req.userId;
  try {
    const event = await Event.findByPk(req.params.id)
    if(!event) {
      return res.status(404).json({
        error: true,
        msg: 'Evento no encontrado'
      })
    }

    if(event.userId !== userId) {
      return res.status(403).json({
        error: true,
        msg: 'No tiene privilegios para hacer esto'
      })
    }

    await Event.destroy({ where : { id : req.params.id }, force: true }) 

    res.status(200).json({
      error: false,
      msg: 'Evento borrado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}