const database = require('./DB')

exports.commonStud = function(req, res, next) {
  
  console.log("Req ", req.teacher.value)
  const teacher = req.teacher.value.teacher;

  if (!teacher) {
    res.status(500)
      .send({
        status: "failure",
        error: "Unable to get teacher. Please provide teacher."
      })
  }

  var list_emails = []
  var all_emails = []

  var async = require("async");

  async.each(teacher,
    function (teacher_email, callback) {
      database.Teacher.findOne(
        {
          where: { email: teacher_email }
        }).then((teacher) => {
          console.log(teacher.id)
          database.Student.findAll({
            where: {
              teacherId: teacher.id
            }
          }).then((data) => {
            var dummy = []
            data.forEach(student => {
              console.log(student.email)
              dummy.push(student.email)
              all_emails.push(student.email)
            })
            list_emails.push(new Set(dummy))
            callback()
          })
        })
    },
    function (err) {
      console.log(list_emails)
      list_emails.forEach(element => {
        console.log(element, " >>>>>>>>>>>")
      });
      var common = list_emails.reduce((set1, set2) => [...set1].filter(num => set2.has(num)))
      console.log(common, "///////////")
      res.status(200)
        .send({
          status: "success",
          data: {
            "students": common
          }
        })
    }
  );
  res.end();
}
