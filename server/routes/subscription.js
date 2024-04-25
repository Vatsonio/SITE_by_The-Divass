const express = require('express');
const router = express.Router();

const Subscription = require('../models/Subscription');

// Subscribe to an application
router.post('/:id/subscribe', async (req, res) => {
    const newSubscription = new Subscription({
        applicationId: req.params.id,
        userId: req.body.userId
    });

    const savedSubscription = await newSubscription.save();
    res.json(savedSubscription);
});

// Unsubscribe from an application
router.delete('/:id/subscribe', async (req, res) => {
    const removedSubscription = await Subscription.findOneAndDelete({
        applicationId: req.params.id,
        userId: req.body.userId
    });

    res.json(removedSubscription);
});

module.exports = router;
