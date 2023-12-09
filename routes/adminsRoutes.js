const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController');




router.get('/', adminsController.getAllAdmins);
// router.get('/:id', teachersController.getTeacherById);
 router.post('/', adminsController.addAdmin);
 router.put('/:id', adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);



router.get('/admindetails/:adminId', adminsController.getAdminDetailsByAdminId);
router.get('/adminsettings/:userId', adminsController.getAllAdminSettingsInfo);
router.put('/adminsettings/:userId', adminsController.updateAdminUserPassword);




module.exports = router;
