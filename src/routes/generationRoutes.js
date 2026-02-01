
const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generationController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateGeneration } = require('../middleware/validationMiddleware');

router.use(authMiddleware);

router.post('/', validateGeneration, generationController.generateContent);
router.post('/pitch-deck', validateGeneration, generationController.generatePitchDeck);
router.post('/business-plan', validateGeneration, generationController.generateBusinessPlan);
router.post('/export-pdf', generationController.exportPdf); // Content validation implied in logic or add specific validator

router.get('/', generationController.getHistory);

module.exports = router;
