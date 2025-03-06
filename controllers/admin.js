const Registration = require("../models/registration");
const Student = require("../models/student");
const Teacher = require("../models/teacher");


exports.registerStudent = (req, res, next) => {
    console.log("registerStudent");

    const student = req.body.student;
    const teacher = req.body.teacher;

    let studentID;
    let teacherID;

    //     {
    //         "teacher": "teacherken@gmail.com",
    //         "students":
    //             [
    //                 "studentjon@gmail.com",
    //                 "studenthon@gmail.com"
    //             ]
    //     });

    //Get Student ID
    studentID = Student.findOne({ where: { email: student } })
        .then(student => { console.log(student.id) });

    //Get Teacher ID
    teacherID = Teacher.findOne({ where: { email: teacher } })


    //Register a student to a teacher
    Registration.create({
        studentID: studentID,
        teacherID: teacherID
    }).then(result => {
        console.log(result);
        res.status(204).json({
            "message": "Registration successful"
        }
        );  // 204 is the status code for success
    })
};

exports.addStudent = (req, res, next) => {

    const student = req.body.student;

    console.log(student);

    Student.create({
        email: student.email,
        name:  student.name
    }).then(result => {
        console.log(result  );
    }).catch(err => {
        console.log(err);
    });

    res.status(204).json({
        "message": "Student has been added"
    });
};

exports.addTeacher = (req, res, next) => {
    const teacher = req.body.teacher;

    console.log(teacher);

    Teacher.create({
        email: teacher.email,
        name:  teacher.name
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });

    res.status(204).json({
        "message": "Teacher has been added"
    });
};

exports.getCommonStudents = (req, res, next) => {
    res.status(200).json(
        {
            "students":
                [
                    "commonstudent1@gmail.com",
                    "commonstudent2@gmail.com",
                    "student_only_under_teacher_ken@gmail.com"
                ]
        });
};


exports.suspendStudent = (req, res, next) => {
    res.status(204).json({
        "message": "Student has been suspended"
    });
};



