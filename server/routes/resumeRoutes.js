const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

router.get('/', auth, resumeController.getUserResumes);
router.post('/', auth, resumeController.createResume);
router.get('/:id', auth, resumeController.getResume);
router.put('/:id', auth, resumeController.updateResume);
router.delete('/:id', auth, resumeController.deleteResume);
router.post('/upload', auth, resumeController.uploadPhoto);

module.exports = router;