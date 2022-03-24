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
      msg: 'getEventos',
      events
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.newEvent = async (req, res) => {
  try {
    // const user = await User.findByPk(req.userId)
    // console.log(user);
    const event = await Event.create({...req.body, userId: req.userId});
    res.status(200).json({
      error: false,
      msg: 'newEvent',
  });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.editEvent = async (req, res) => {
  try {
    res.status(200).json({
      error: false,
      msg: 'editEvent'
  });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    res.status(200).json({
      error: false,
      msg: 'deleteEvent'
  });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
}