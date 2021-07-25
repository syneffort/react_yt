const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
// const Video = require('../models/Video');
const auth = require('../middleware/auth');

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
    })
});

module.exports = router;