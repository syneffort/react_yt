const express = require('express');
const Subscriber = require('../models/Subcribers');

const router = express.Router();


router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, SubscribeNumber: subscribe.length });
    });
});

router.post('/subscribed', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).json({ success: false, err });

        let result = subscribe.length !== 0 ? true : false;
        return res.status(200).json({ success: true, subscribed: result});
    });
});

router.post('/unsubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, doc});
    });
});

router.post('/subscribe', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribes) => {
        if(err) return res.status(400).json({ success: false, err });

        if (subscribes.length !== 0) return res.status(200).json({ success: true })

        const subscribe = new Subscriber(req.body);
        subscribe.save((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });

            return res.status(200).json({ success: true });
        });
    });

    
});

module.exports = router;