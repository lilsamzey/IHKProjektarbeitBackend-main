const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 // Yeni ekledik



const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const adminsRoutes = require('./routes/adminsRoutes');

const emailRoutes = require('./routes/emailRoutes');




const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());






app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/courses', coursesRoutes);
app.use('/users', usersRoutes);
app.use('/admins', adminsRoutes);



app.use('/email', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
