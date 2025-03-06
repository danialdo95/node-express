const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/register', adminController.registerStudent);

router.get('/commonstudents', adminController.getCommonStudents);

router.post('/addstudent', adminController.addStudent);

router.post('/addteacher', adminController.addTeacher);

router.post('/suspend', adminController.suspendStudent);

module.exports = router;







