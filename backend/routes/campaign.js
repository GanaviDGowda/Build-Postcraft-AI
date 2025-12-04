const express = require('express');
const multer = require('multer');

const { uploadImage, generateCampaign } = require('../controllers/aiController');

const router = express.Router();

// Multer config: memory storage with ~10MB file size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// POST /api/campaign/upload
router.post('/upload', upload.single('image'), uploadImage);

// POST /api/campaign/generate
router.post('/generate', generateCampaign);

module.exports = router;

