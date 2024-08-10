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


// Allow CORS for your frontend origin
// const allowedOrigins = {
//   origin: 'https://feedback-form-frontend.vercel.app', // replace with your frontend URL
// };
// app.use(cors(allowedOrigins));

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


const corsOptions = {
  origin: 'https://feedback-form-frontend.vercel.app', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with options
app.use(cors(corsOptions));

// Your routes here
app.get('/students', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

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
