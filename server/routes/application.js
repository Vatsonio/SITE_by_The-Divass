const express = require('express');
const router = express.Router();

const Application = require('../models/Application');

// Get all applications
router.get('/', async (req, res) => {
    const applications = await Application.find();
    res.json(applications);
});

// Create a new application
router.post('/', async (req, res) => {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();

    res.json(savedApplication);
});

// Get a specific application
router.get('/:id', async (req, res) => {
    const application = await Application.findById(req.params.id);
    res.json(application);
});

// Update application status
router.put('/:id/status', async (req, res) => {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedApplication);
});

module.exports = router;
