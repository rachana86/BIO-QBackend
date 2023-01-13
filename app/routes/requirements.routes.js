module.exports = app => {
    const requirements = require("../controllers/requirements.controller.js");
    var router = require("express").Router();
    
    // Create a new requirement
    router.post("/", requirements.create);
  
    // Retrieve all requirement
    router.get("/", requirements.findAll);
  
    // Retrieve all published requirements
    router.get("/published", requirements.findAllPublished);
  
    // Retrieve a single Project with id
    router.get("/:id", requirements.findOne);
  
    // Update a requirement with id
    router.put("/:id", requirements.update);
  
    // Delete a requirement with id
    router.delete("/:id", requirements.delete);
  
    // Delete all requirements
    router.delete("/", requirements.deleteAll);
  
    app.use('/api/requirements', router);
  };