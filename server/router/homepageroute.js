const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { User } = require('../model/schema');


// Get name for the logged-in user
// router.get('/getdata', authenticate, async (req, res) => {
//    res.send(req.rootUser);
// });

module.exports = router;
