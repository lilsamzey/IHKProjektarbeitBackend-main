const sql = require('mssql');
const config = require('../config');






exports.getAllStudents = async () => {
  try {
    
      const pool = await sql.connect(config);
      
      const result = await pool.request().query('SELECT * FROM Students Order by StudentId DESC');
      
      return result.recordset;
  } catch (error) {
      throw new Error('An error occurred while fetching students');
  }
};





exports.getStudentUserByStudentId = async (studentId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`SELECT * FROM StudentDetails WHERE studentId = ${studentId}`);
   

    return result.recordset;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while retrieving student user information');
  }
};














exports.addStudent = async (student) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      EXEC AddStudent
        @firstName = N'${student.firstName}',
        @lastName = N'${student.lastName}',
        @gender = N'${student.gender}',
        @mobile = N'${student.mobile}',
        @email = N'${student.email}',
        @parentName = N'${student.parentName}',
        @parentNo = N'${student.parentNo}',
        @address = N'${student.address}'
    `);
    return result.recordset;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while adding a student');
  }
};




exports.updateStudent = async (studentId, student) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      EXEC updateStudent
        @studentId = ${studentId},
        @firstName = '${student.firstName}',
        @lastName = '${student.lastName}',
        @gender = '${student.gender}',
        @mobile = '${student.mobile}',
        @email = '${student.email}',
        @parentName = '${student.parentName}',
        @parentNo = '${student.parentNo}',
        @address = '${student.address}'
    `);
    return result.recordset;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the student');
  }
};


exports.deleteStudent = async (studentId) => {
  try {
    console.log(studentId)
    const pool = await sql.connect(config);
    await pool.request()
      .input('studentId', sql.Int, studentId)
      .execute('deleteStudent');
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while deleting the student');
  }
};





const getAllStudentSettingsInfo = async (userId) =>{
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`EXEC getStudentSettingsInfoByUserId @userId=${userId}`);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching teachers');
   } 
  //finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};



exports.updateStudentsUserPassword = async (userId, newPassword) =>{
 
  try {
    console.log( newPassword);
   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`update users set password= '${newPassword}' where id=${userId}`);

    console.log('model:'+ newPassword);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while updateing students password');
   } 
  //finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};



