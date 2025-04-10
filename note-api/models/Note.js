const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  judul: String,
  isi: String,
  tanggal: Date
});

module.exports = mongoose.model('Note', noteSchema);
