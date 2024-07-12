const express = require('express');
const router = express.Router();
const Houseowner = require('../models/houseowner');

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const newhouseowner = new Houseowner({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phone
    });

    try {
        const houseowner = await newhouseowner.save();
        res.send('House owner Registered successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const houseowner = await Houseowner.findOne({ email: email.trim(), password: password.trim() });
        if (houseowner) {
            const temp = {
                name: houseowner.name,
                email: houseowner.email,
                phone: houseowner.phone,
                _id: houseowner._id
            };
            res.send(temp);
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
