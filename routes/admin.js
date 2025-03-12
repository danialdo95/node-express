const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/register', adminController.registerStudent);

router.get('/commonstudents', adminController.getCommonStudents);

router.post('/suspend', adminController.suspendStudent);

router.post('/addstudent', adminController.addStudent);

router.post('/addteacher', adminController.addTeacher);

module.exports = router;







