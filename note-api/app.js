const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', noteRoutes);

// Koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/noteapp') 
  .then(() => {
    console.log('✅ Terhubung ke MongoDB');
    
    // Jalankan server setelah koneksi sukses
    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Gagal koneksi ke MongoDB:', err.message);
  });
