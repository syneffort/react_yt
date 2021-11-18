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

router.post('/upLike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    
    // 좋아요 추가
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err });

        // 싫어요가 이미 등록된 경우 삭제
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                
                res.status(200).json({ success: true });
            });
    });
});

router.post('/unLike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
                
                res.status(200).json({ success: true });
        });
});

router.post('/upDislike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    
    // 싫어요 추가
    const dislike = new Dislike(variable);
    dislike.save((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });

        // 좋아요가 이미 등록된 경우 삭제
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                
                res.status(200).json({ success: true });
            });
    });
});

router.post('/unDislike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
                
                res.status(200).json({ success: true });
        });
});

module.exports = router;