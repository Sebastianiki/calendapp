const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extend: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
};

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});