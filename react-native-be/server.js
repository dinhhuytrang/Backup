const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRouter = require('./routers/product.router');
const clubRouter = require('./routers/club.router');
const cartRouter = require('./routers/cart.router');
const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/userRouter');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


// app routes
app.use('/products',productRouter),
app.use('/clubs',clubRouter)
app.use('/cart',cartRouter)
app.use('/auth',authRouter),
app.use('/user',userRouter)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


// Define a sample route
app.get('/', (req, res) => {
  res.send('Welcome to the React Native Backend API!');
});

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error response
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
