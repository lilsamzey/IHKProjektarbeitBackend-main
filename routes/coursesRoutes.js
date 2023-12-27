const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');








router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.addCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);










router.get('/:courseId/students', coursesController.getStudentsByCourseId);
router.get('/:courseId/teachers', coursesController.getTeachersByCourseId);


router.post('/:courseId/enroll', coursesController.addEnrolledStudent);
router.delete('/:courseId/students/:studentId', coursesController.removeStudentFromCourse);

router.post('/:courseId/assign', coursesController.addAssignedTeacher);
router.delete('/:courseId/teachers/:teacherId', coursesController.removeTeacherFromCourse);






module.exports = router;
