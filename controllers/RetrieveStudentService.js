const database = require('./DB');

exports.retrieveStud = function(req, res, next) {
    console.log("Req ", req.teacher.value)
    const teacher = req.teacher.value.teacher;
    const notification = req.teacher.value.notification;
  
    var listofwords = notification.split(' ')
    var mentioned_emails = []
  
    if (!teacher) {
      res.status(500)
        .send({
          status: "failure",
          error: "Unable to get teacher. Please provide teacher."
        })
    }
  
    database.Teacher.findOne(
      {
        where: { email: teacher }
      }).then((teacher) => {
        console.log(teacher.id)
        database.Student.findAll({
          where: {
            teacherId: teacher.id,
            status: 1
          }
        }).then((data) => {
  
          var student_emails = []
          data.forEach(student => {
            console.log(student.email)
            student_emails.push(student.email)
  
          })
  
  
          console.log(">>> Student emails for this teacher:", student_emails);
          console.log(">>>> need to merge with mentioned ones..")
  
          for (const word of listofwords) {
            if (word[0] == "@") {
              mentioned_emails.push(word.substr(1))
            }
          }
  
          console.log(">>>> Mentioned emails... ", mentioned_emails)
  
          var dummy = student_emails.concat(mentioned_emails);
  
          console.log(">>>>> Send resp")
          res.status(200)
            .send({
              status: "success",
              data: {
                "recipients": dummy.filter(onlyUnique)
              }
            })
  
        })
      })
    res.end();
  }
  
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  