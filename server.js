const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const db = require('./config/keys').mongoURI;
const app = express();

//Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected ...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

//init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

//Server static assets in production

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
