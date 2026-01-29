const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    content: { type: String, required: true },
}, { timestamps: true });

// Ensure unique date per user
noteSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Note', noteSchema);
