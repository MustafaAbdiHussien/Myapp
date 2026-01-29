const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ["All", "Today", "Upcoming", "Completed"], default: "Today" },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
