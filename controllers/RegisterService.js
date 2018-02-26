const database = require('./DB')

exports.registerStud = function(req, res,next) {

    console.log("Req ", req.teacher.value)
    const students = req.teacher.value.students;
    const teacher = req.teacher.value.teacher;
  
    if (!students || !teacher) {
      res.status(500)
        .send({
          status: "failure",
          error: "Unable to find student or teacher. Please provide them."
        })
    }
  
    if (students && students.length == 0) {
      res.status(500)
        .send({
          status: "failure",
          error: "No students provided for register. please provide atleast one."
        })
    }
  
    //  Store in database and Send response normally
    database.Teacher
      .findOrCreate({ where: { email: teacher }, })
      .spread((teacher, created) => {
        console.log(teacher.get({
          plain: true
        }))
        console.log(created)
  
        students.forEach(student_email => {
          database.Student.findOrCreate({ where: { email: student_email, status: true, teacherId: teacher.id } })
            .spread((student, created) => {
              console.log(student.get({
                plain: true
              }))
              console.log(created)
              student.setTeacher(teacher)
            })
        });
  
        res.status(200)
          .send({
            status: "success",
            data: "Student successfully registered."
          })
      }) 
  
    res.end();
  }