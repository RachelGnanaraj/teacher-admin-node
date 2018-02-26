//Database

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root@localhost:3306/teacher-admin-apis');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Student = sequelize.define('student', {
  email: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN
  }
});

const Teacher = sequelize.define('teacher', {
  email: {
    type: Sequelize.STRING
  },
});

Teacher.hasMany(Student);
Student.belongsTo(Teacher); // Will add teacherId to student

Teacher.sync();
Student.sync();

module.exports = {
  Teacher: Teacher,
  Student: Student
};