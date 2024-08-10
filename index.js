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

// CORS configuration
// const allowedOrigins = [
//   'http://localhost:3001',
//   'https://feedback-form-frontend.vercel.app',
// ];

// Allow CORS for your frontend origin
const allowedOrigins = {
  origin: 'https://feedback-form-frontend.vercel.app', // replace with your frontend URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(allowedOrigins));


// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: false,
// }));

// app.use(cors())

app.use(express.json());

dbConnect()
.then(() => {
    app.use('/', authRoutes);
    app.use('/', feedbackRoutes);
    app.use('/students', studentRoutes);
    app.use('/teachers', teacherRoutes);
    app.use('/admin', adminRoutes);
    app.use('/feedbackForm', feedbackFormRoutes);


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



// Default route
app.get('/', (req, res) => {
  res.send("Hello and welcome from index page..............!!!!!!!!)))))))");
});

module.exports = app;
