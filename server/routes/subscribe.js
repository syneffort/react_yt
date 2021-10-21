const express = require('express');
const Subscriber = require('../models/Subcribers');

const router = express.Router();


router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);

        return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
    });
});

router.post('/subscribed', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
        if (err) return res.status(400).send(err);

        let result = subscribe.length !== 0 ? true : false;
        return res.status(200).json({ success: true, subscribed: result})
    });
});

module.exports = router;