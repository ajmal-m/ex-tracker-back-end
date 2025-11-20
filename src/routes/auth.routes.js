const express = require("express");
const router = express.Router();

const {signup , login, logout} = require("../controllers/auth.controller");

router.post('/sign-up' , signup);
router.post('/log-in' , login);
router.post('/log-out' , logout);


module.exports = router;
