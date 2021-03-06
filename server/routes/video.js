const express = require('express');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Video = require('../models/Video');

const router = express.Router();
// const Video = require('../models/Video');
const auth = require('../middleware/auth');
const Subscriber = require('../models/Subcribers');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4') return cb(res.status(400).end('mp4 파일만 가능합니다.'), false)

        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err });
        
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post('/thumbnail', (req, res) => {

    let filePath;
    let fileDuration;

    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    ffmpeg(req.body.url)
    .on('filenames', function(filenames) {
        console.log(`Will generated ${filenames.join(', ')}`);
        console.log(filenames);

        filePath = `uploads/thumbnails/${filenames[0]}`;
    })
    .on('end', function() {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration });
    })
    .on('error', function(err) {
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({
        // at 20% 40% 60% 80%
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        // %b : base input name w/o extension
        filename: 'thumbnail-%b.png'
    });
});

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        res.status(200).json({ success: true });
    });
});

router.get('/getVideos', (req, res) => {
    
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, videos });
        });
});

router.post('/getVideoDetail', (req, res) => {
    
    Video.findOne({ _id: req.body.videoId })
        .populate('writer')
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            
            return res.status(200).json({ success: true, videoDetail });
        });
});

router.post('/getSubscriptionVideos', (req, res) => {
    
    // 구독하는 사람들을 찾기
    Subscriber.find({userFrom: req.body.userFrom})
        .exec((err, subscriberInfo) => {
            if (err) return res.status(400).send(err);

            let subscribeUser = [];
            subscriberInfo.map((subscriber, i) => {
                subscribeUser.push(subscriber.userTo);
            });

            // 찾은 사람의 비디오를 가져오기
            Video.find({writer: {$in: subscribeUser}})
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);

                    res.status(200).json({success: true, videos});
                })
        });
});

module.exports = router;