const Registration = require("../models/registration");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const { checkifStudentSuspended } = require("../util/validations");


exports.registerStudent = async (req, res, next) => {
    console.log("registerStudent");

    const student = req.body.student;
    const teacher = req.body.teacher;

    // "teacher" : {
    //     "name": "elin",
    //     "email": "elin@gmail.com" 
    // },
    // "student" : {
    //     "name": "Danial",
    //     "email": "danialdo95@gmail.com" 
    // }

    const status =  await checkifStudentSuspended(student);

    if (status === true) {  // if student is suspended {
        res.status(403).json({
            "message": "Student is suspended"
        });
    } else {

        //Get Student ID
        const stud = await Student.findOne({ where: { email: student.email }, attributes: ['id', 'name', 'email'] });

        console.log("Student", stud);

        //Get Teacher ID
        const teach = await Teacher.findOne({ where: { email: teacher.email }, attributes: ['id', 'name', 'email'] });

        console.log("teacher", teach);


        //Register a student to a teacher
        Registration.create({
            studentID: stud.dataValues.id,
            teacherID: teach.dataValues.id
        }).then(result => {
            console.log(result);
            res.status(204).json({
                "message": "Registration successful"
            }
            );  // 204 is the status code for success
        })
    }
};

exports.registerStudents = async (req, res, next) => {
    console.log("registerStudents");

    // {
    //     "teacher": "teacherken@gmail.com"
    //     "students":
    //       [
    //         "studentjon@gmail.com",
    //         "studenthon@gmail.com"
    //       ]
    //   }

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

    const student = req.body.student;
    // {
    //     "student" : "studentmary@gmail.com"
    // }

    // check if student exists
    student = Student.findOne({ where: { email: student.email }, attributes: ['id', 'name', 'email'] });

    if (!student) {
        res.status(404).json({
            "message": "Student not found"
        });
    } else {

        console.log(student);

        Student.update({
            status: 'Suspended'
        }, {
            where: {
                email: student.email
            }
        }).then(result => {
            res.status(204).json({
                "message": "Student has been suspended"
            });
            console.log(result);
        }).catch(err => {
            console.log(err);
        });

    }


};

exports.addStudent = (req, res, next) => {

    const student = req.body.student;

    console.log(student);

    Student.create({
        email: student.email,
        name: student.name,
        status: student.status,
    }).then(result => {
        console.log(result);
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
        name: teacher.name
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });

    res.status(204).json({
        "message": "Teacher has been added"
    });
};



