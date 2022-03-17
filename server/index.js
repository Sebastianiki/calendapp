const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extend: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
};

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api/posts', postRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});