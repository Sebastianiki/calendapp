const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const userRoutes = require('./routes/user')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extend: true }));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});