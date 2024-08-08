require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackFormRoutes = require('./routes/feedbackFormRoutes');

const app = express();


// Add CORS configuration
// const corsOptions = {
//   origin: 'https://feedback-form-frontend.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   credentials: true, 
// };

// app.use(cors(corsOptions));



const corsOptions = {
  origin: (origin, callback) => {
      const allowedOrigins = [
          'http://localhost:3001',
          'https://feedback-form-frontend.vercel.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
      } else {
          callback(new Error('Not allowed by CORS')); // Deny the origin
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};

app.use(cors(corsOptions));



// Database connection
dbConnect()
  .then(() => {
    // Route definitions
    app.use('/api/auth', authRoutes);
    app.use('/api/feedback', feedbackRoutes);
    app.use('/api/students', studentRoutes);
    app.use('/api/teachers', teacherRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/feedbackForm', feedbackFormRoutes);

    // Port configuration
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// // Default route
app.get('/', (req, res) => {
  res.send("Hello and welcome from index page..............!!!!!!!!)))))))");
});

module.exports = app;
