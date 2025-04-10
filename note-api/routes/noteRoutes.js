const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET semua catatan 
router.get('/notes', async (req, res) => {
  const notes = await Note.find().select('-__v');
  res.json(notes);
});

// GET catatan by ID 
router.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id).select('-__v');
  res.json(note);
});

// POST catatan baru 
router.post('/notes', async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  const result = newNote.toObject();
  delete result.__v;

  res.status(201).json({
    message: 'Catatan berhasil ditambahkan',
    data: result
  });
});

// PUT (update) catatan 
router.put('/notes/:id', async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-__v');
  res.json({
    message: 'Catatan berhasil diperbarui',
    data: updatedNote
  });
});

// DELETE catatan 
router.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Catatan berhasil dihapus' });
});

module.exports = router;
