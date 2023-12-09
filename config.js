
const sql = require('mssql');






async function connectToDatabase() {
  try {
    const config = {
      user: 'admin',
      password: 'Klmn-32553255',
      server: 'ihkprojekt.ccrtpn4jk1n3.eu-central-1.rds.amazonaws.com',
      database: 'coursemanagementsystem',
      options: {
      encrypt: true,
      trustServerCertificate: true,
      }
    };

    const pool = await sql.connect(config); 
    console.log('Connected to the AWS database successfully!');


    // sql.close();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

// Call funktion to connect to the database
connectToDatabase();










