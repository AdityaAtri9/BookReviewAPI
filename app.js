const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json({
  strict: false,
}));

// Debug 
app.post('/debug', (req, res) => {
  console.log('BODY:', req.body);
  res.json({ received: req.body });
});


// Testing API
app.get('/', (req, res) => res.send('API is running'));

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

  //Use routes
  app.use('/', authRoutes);
  app.use('/books', bookRoutes);

  module.exports = app;