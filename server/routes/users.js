const express = require('express');
const router = express.Router();
const User = require('../models/User');

const auth = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(err, user);
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '이메일에 해당하는 사용자가 없습니다.',
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '잘못된 비밀번호입니다.'});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_authExp', user.tokenExp)
                res.cookie('w_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token : "" }, (err, user) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).send({ success: true });
    });
});

module.exports = router;