const sql = require('mssql');
const config = require('../config');

exports.getAllTeachers = async () => {
  
  try {
   const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Teachers ORDER BY TeacherId DESC');
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

exports.getTeacherById = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Teachers WHERE TeacherId = @id');

    if (result.recordset.length === 0) {
      throw new Error('Teacher not found');
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the teacher');
  }
};



exports.addTeacher = async (teacher) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      EXEC AddTeacher
        @firstName = N'${teacher.firstName}',
        @lastName = N'${teacher.lastName}',
        @gender = N'${teacher.gender}',
        @mobile = N'${teacher.mobile}',
        @email = N'${teacher.email}',
        @address = N'${teacher.address}'
    `);

    
    if (result.recordset && result.recordset[0].ErrorMessage) {
      throw new Error(result.recordset[0].ErrorMessage);
    }

    return { message: 'Teacher added successfully' };
  } catch (error) {
    console.error(error);
    throw error; 
  }
};







const getTeacherId = async (pool, email) => {
  const query = `
    SELECT TeacherId FROM Teachers WHERE email = '${email}';
  `;
  const result = await pool.request().query(query);
  const teacherId = result.recordset[0].TeacherId;
  return teacherId;
};








exports.updateTeacher = async (id,teacher) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      EXEC updateTeacher
        @teacherId = ${teacher.teacherId},
        @firstName = N'${teacher.firstName}',
        @lastName = N'${teacher.lastName}',
        @gender = N'${teacher.gender}',
        @mobile = N'${teacher.mobile}',
        @email = N'${teacher.email}',
        @address = N'${teacher.address}'
    `);
    if (result.recordset && result.recordset[0].ErrorMessage) {
      throw new Error('Check Email address');
    }

    return { message: 'Teacher updated successfully' };
  } catch (error) {
    
    throw new Error('An error occurred while updating a teacher');
  }
};
  



  
exports.deleteTeacher = async (id) => {
  try {
    console.log(id)
    const pool = await new sql.connect(config);
    const query = `EXEC deleteTeacher  @teacherId = ${id}`;
    await pool.request().query(query);

    console.log('Deleted Teacher id:' +id)
  } catch (error) {
    throw new Error('Failed to delete teacher');
  }
};







// Öğretmenin kullanıcı bilgilerini almak için fonksiyon
exports.getTeacherUserByTeacherId = async (teacherId) => {
  try {
    // Veritabanına bağlan
    await new sql.connect(config);

    console.log('control 11')
    // Öğretmenin kullanıcı bilgilerini almak için sorguyu oluştur
    const query = `
      SELECT u.id, u.username, u.password, u.email, u.lastName, u.role, u.token, u.img, u.firstName
      FROM Users AS u
      JOIN teacherUsers AS tu ON u.id = tu.userId
      WHERE tu.teacherId = ${teacherId}
    `;
console.log('control 21')

    // Sorguyu çalıştır ve sonuçları al
    const result = await sql.query(query);

console.log('control 31')

    // Sonuçları döndür
    console.log('hello', result.recordset)

    return result.recordset[0];

  } catch (error) {
    console.error('Hata:', error);
    throw new Error('Öğretmen kullanıcılarını alma işleminde bir hata oluştu');
  } finally {
    // Bağlantıyı kapat
    //sql.close();
  }
};









  exports.getAllTeacherSettingsInfo = async (userId) => {
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`EXEC getTeacherSettingsInfoByUserId @userId=${userId}`);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching teachers');
   } 
  
};




  exports.updateTeacherUserPassword = async (userId, newPassword) => {
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`update users set password='${newPassword}' where id=${userId}`);
   
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while updateing students password');
   } 
 
};