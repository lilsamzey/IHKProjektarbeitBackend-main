const adminsModel = require('../models/adminsModel');







exports.getAllAdmins = async (req, res) => {
    try {
      const Admins = await adminsModel.getAllAdmins();
      res.status(200).json(Admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




  exports.getAdminDetailsByAdminId = async (req, res) => {
    try {

      console.log('getadmindetails works')
      const adminId = req.params.adminId;

      console.log(adminId)
      const adminDetails = await adminsModel.getAdminDetailsByAdminId(adminId);
      res.status(200).json(adminDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };







  exports.addAdmin = async (req, res) => {
    try {
      const admin = req.body;
      const result = await adminsModel.addAdmin(admin);
  
      // Hata kontrolü
      if (result && result[0] && result[0].ErrorMessage) {
        // Hata mesajı varsa, 400 Bad Request yanıtı döndür
        res.status(400).json({ error: result[0].ErrorMessage });
      } else {
        // Hata yoksa, başarılı yanıt döndür
        console.log('Added admin name: ' + admin.firstName);
        res.status(200).json({ message: 'Admin added successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  


  exports.updateAdmin = async (req, res) => {
    try {
      const adminId = req.params.id; // URL'den admin ID'sini al
      const admin = req.body; // HTTP isteğinden admin bilgilerini al
  
      // URL'den alınan admin ID'sini admin nesnesine ekle
      admin.adminId = parseInt(adminId); // adminId'yi integer'a çevir
  
      console.log("Updating admin with ID: " + adminId);
      console.log(admin);
  
      await adminsModel.updateAdmin(admin);
  
     
      res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  










  exports.deleteAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      await adminsModel.deleteAdmin(id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };






exports.getAllAdminSettingsInfo = async (req, res) => {
    try {
      
      const userId=req.params.userId;
      const adminsettings = await adminsModel.getAllAdminSettingsInfo(userId);
      res.status(200).json(adminsettings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  exports.updateAdminUserPassword = async (req, res) => {
    try {
      const userId=req.params.userId;
      const newPassword=req.body.password;
      
      const adminsnewPassword = await adminsModel.updateAdminUserPassword(userId, newPassword);
      res.status(200).json(adminsnewPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

