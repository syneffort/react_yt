const express = require('express');
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');

const router = express.Router();


router.post('/getLikes', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId };
    } else {
        variable = { commentId: req.body.commentId };
    }
    
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, likes });
        });
});

router.post('/getDislikes', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId };
    } else {
        variable = { commentId: req.body.commentId };
    }
    
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, dislikes: dislikes });
        });
});

module.exports = router;