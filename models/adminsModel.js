const sql = require('mssql');
const config = require('../config');











exports.getAllAdmins = async () => {
  
    try {
     const pool = await new sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Admins ORDER BY adminId DESC');
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while fetching teachers');
     } 
    
  };



  exports.getAdminDetailsByAdminId = async (adminId) => {
    try {

      console.log('getadmindetails works')
      const pool = await new sql.connect(config);
      const query = `EXEC getAdminDetailsByAdminId @adminId =${adminId}`;
      const result = await pool.request().query(query);
      console.log('admin id:' +adminId)
      return result.recordset;
  
           
    } catch (error) {
      throw new Error('Admin details failed');
    }
  };









  exports.addAdmin = async (admin) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(`
        EXEC AddAdminAndUser
          @firstName = N'${admin.firstName}',
          @lastName = N'${admin.lastName}',
          @email = N'${admin.email}'
      `);
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while adding an admin');
    }
  };
  



  exports.updateAdmin = async (admin) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(`
        EXEC updateAdmin
          @adminId = ${admin.adminId},
          @firstName = '${admin.firstName}',
          @lastName = '${admin.lastName}',
          @email = '${admin.email}'
      `);
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while updating the admin');
    }
  };








  exports.deleteAdmin = async (id) => {
    try {
      const pool = await new sql.connect(config);
      const query = `EXEC deleteAdmin ${id}`;
      await pool.request().query(query);
  
      console.log('Deleted Teacher id:' +id)
    } catch (error) {
      throw new Error('Failed to delete teacher');
    }
  };






exports.getAllAdminSettingsInfo = async (userId) => {
 
    try {
  
     
     const pool = await new sql.connect(config);
      const result = await pool.request().query(`EXEC getAdminSettingsInfoByUserId @userId=${userId}`);
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while fetching teachers');
     } 
    
  };
  
  
  
  
    exports.updateAdminUserPassword = async (userId, newPassword) => {
   
    try {
  
     
     const pool = await new sql.connect(config);
      const result = await pool.request().query(`update users set password='${newPassword}' where id=${userId}`);
     
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while updateing students password');
     } 
    
  };



