const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'My Resume' },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    summary: String,
    photoUrl: String
  },
  education: [{
    institution: String,
    degree: String,
    year: String,
    id: String
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String,
    id: String
  }],
  skills: [String],
  template: { type: String, default: 'classic' },
  colors: {
    primary: { type: String, default: '#2563eb' },
    secondary: { type: String, default: '#1e293b' },
    background: { type: String, default: '#ffffff' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);