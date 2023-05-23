const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const pixabayRoutes = require('./routes/pixabayRoutes');

// Enable CORS
app.use(cors());

app.use(express.json());

// Use Morgan logger middleware
app.use(morgan('dev'));

// Routes
app.use('/api/pixabay', pixabayRoutes);

//Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


