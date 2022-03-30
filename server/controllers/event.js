const { Event, User } = require('../models');

exports.getEvents = async (req, res) => {
  try{
    const events = await Event.findAll();
    res.status(200).json({
      error: false,
      events
    });
  }catch(error){
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.newEvent = async (req, res) => {
  try {
    let event = await Event.create({...req.body, userId: req.userId});
    
    event = await Event.findByPk(event.id)

    res.status(200).json({
      error: false,
      event
    });
  } catch (error) {
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

    await Event.update({...req.body}, { where : { id : req.params.id } })

    const eventUpdated = await Event.findByPk(event.id)


    res.status(200).json({
      error: false,
      msg: 'Evento editado correctamente',
      event: eventUpdated
    });
  } catch (error) {
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
    res.status(500).send('Ha ocurrido un error');
  }
}