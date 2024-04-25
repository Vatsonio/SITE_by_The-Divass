const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.json(savedUser);
});

module.exports = router;
