const Resume = require('../models/Resume');
const cloudinary = require('../config/cloudinary');

// Get all resumes for user
exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort('-createdAt');
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new resume
exports.createResume = async (req, res) => {
  const { title } = req.body;
  
  try {
    const newResume = new Resume({
      userId: req.user.id,
      title
    });

    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  const resumeData = req.body;
  
  try {
    let resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: resumeData },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await resume.remove();
    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Upload photo
exports.uploadPhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'resume_photos',
      width: 300,
      height: 300,
      crop: 'fill'
    });
    
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};