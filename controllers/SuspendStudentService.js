const database = require('./DB');
exports.suspendStud = function(req, res, next) {
    console.log("Req ", req.student.value)
    const student = req.student.value.student;
  
    if (!student) {
      res.status(500)
        .send({
          status: "failure",
          error: "Unable to get student. Please provide student."
        })
    }
  
    database.Student.update({
      status: 0,
    }, {
        where: {
          email: student,
          status: 1,
        }
      }).then(() => {
  
        res.status(204)
          .send({
            status: "success",
            data: "Student successfully suspended."
          })
  
      })
    res.end();
  }