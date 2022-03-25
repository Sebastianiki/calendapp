const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extend: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
};

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});