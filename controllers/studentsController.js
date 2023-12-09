const sql = require('mssql');
const config = require('../config');

const { Connection, ConnectionPool } = require("tedious");
const studentModel = require('../models/studentModel');




exports.getAllStudents = async (req, res) => {
  try {
    
    const students = await studentModel.getAllStudents();
   
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};















exports.getStudentById = async (req, res) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().input('id', sql.Int, req.params.id).query('SELECT * FROM Students WHERE StudentId = @id');
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the student' });
  }
};





exports.getStudentUserByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const user = await studentModel.getStudentUserByStudentId(studentId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};














exports.addStudent = async (req, res) => {
  try {
    const student = req.body;
    const result = await studentModel.addStudent(student);

    if (result && result[0] && result[0].ErrorMessage) {
      res.status(400).json({ error: result[0].ErrorMessage });
    } else {
      console.log('Added student name: ' + student.firstName);
      res.status(200).json({ message: 'Student added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};







exports.updateStudent = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = req.body; 

    console.log("Updating student with ID: " + studentId);
    console.log(student);

    await studentModel.updateStudent(studentId, student);

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




exports.deleteStudent = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id); // URL'den öğrenci ID'sini al
    await studentModel.deleteStudent(studentId);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};












//StudentNotes


exports.getAllStudentNotes = async (req, res) => {

  
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Studentnotes');
    //const sortedResult = result.recordset.sort((a, b) => b.id - a.id); // Sort the records in descending order based on the 'id' column
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
};







exports.getStudentNoteById = async (req, res) => {
  try {
    const pool = await new sql.connect(config);

    
    const result = await pool.request().input('id', sql.Int, req.params.id).query('SELECT * FROM StudentNotes WHERE StudentId = @id order by DateAdded desc');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the student note' });
  }
};



exports.addStudentNote = async (req, res) => {
  let pool;
  try {
    const { studentId, userId,  priority, note } = req.body;

    pool = await new sql.connect(config);
    await pool.connect();

    // Sorguyu çalıştır
    const query = `
      INSERT INTO StudentNotes (StudentID, Priority, NoteText, AuthorID)
      VALUES (${studentId}, '${priority}', '${note.replace(/'/g, "''")}', ${userId})
    `;

    await pool.query(query);

    // İşlem başarılı mesajını dön
    res.status(200).json({ success: true, message: 'Student note added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add student note', error: error.message });
  } 
  
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};





exports.updateStudentNote = async (req, res) => {
  let pool;
  try {

    
    const updatedNote = req.body;
    pool = await new sql.connect(config);

    console.log(updatedNote)

    await pool.connect();
    const query = `
      UPDATE StudentNotes
      SET NoteText = '${updatedNote.note.replace(/'/g, "''")}', Priority ='${updatedNote.priority}'
      WHERE NoteId = ${updatedNote.NoteId}
    `;
    await pool.request().query(query);
    res.status(200).json({ success: true, message: 'Student note updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update student note', error: error.message });
  } 
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};




exports.deleteStudentNote = async (req, res) => {
  let pool;
  try {
    const id = req.params.id;

    console.log(id)
    pool = await new sql.connect(config);
    await pool.connect();
    const query = `
      DELETE FROM StudentNotes WHERE NoteId = '${id}'
    `;
    await pool.request().query(query);
    res.status(200).json({ success: true, message: 'Student note deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete student note', error: error.message });
  } 
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};





exports.getAllCoursesByStudentId = async (req, res) => {

  
  try {

    const studentId=req.params.studentId;

    const pool = await new sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM courses c INNER JOIN StudentCourses sc ON c.CourseId = sc.courseId WHERE sc.studentId = ${studentId} order by c.startdate`);
    

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
};









exports.getAllStudentSettingsInfo = async (req, res) => {
  try {
    const userId=req.params.userId;
    const studentsettings = await studentModel.getAllStudentSettingsInfo(userId);
    res.status(200).json(studentsettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateStudentsUserPassword = async (req, res) => {
  try {
    const userId=req.params.userId;
    const newPassword=req.body.password;
    console.log(userId, newPassword)
    const studentsnewPassword = await studentModel.updateStudentsUserPassword(userId, newPassword);
    res.status(200).json(studentsnewPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





