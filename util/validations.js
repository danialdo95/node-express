
const Student = require("../models/student");
const Teacher = require("../models/teacher");

const checkifStudentSuspended = async (student) => {

    console.log("checkifStudentSuspended", student);

    // check if student exists
    if (student) {
        const status = await Student.findOne({ where: { email: student.email }, attributes: ['status'] });

        console.log("status", status.dataValues.status);

        if (status.dataValues.status === 'Suspended') {
            return true;
        }
    }

    return false;
}

const checkifStudentExists = async (student) => {
    // check if student exists
    if (student) {
        const student = await Student.findOne({ where: { email: student.email }, attributes: ['id', 'name', 'email'] });

        if (!student) {
            return false;
        }
    }

    return true;
}

const checkifStudentRegistered = async (student, teacher) => {
    //checkifStudentRegistered
    if(student){
        const student = await Registration.findOne({ where: { studentID: student.email }, attributes: ['id', 'studentID'] });

        if (!student) {
            return false;
        }
    }

    return true;

}

const checkifTeacherExists = async (teacher) => {   
    //check if teacher exists
    if (teacher) {
        const teacher = await Teacher.findOne({ where: { email: teacher.email }, attributes: ['id', 'name', 'email'] });

        if (!teacher) {
            return false;
        }
    }

    return true;
}

module.exports = { checkifStudentSuspended, checkifTeacherExists, checkifStudentExists, checkifStudentRegistered };