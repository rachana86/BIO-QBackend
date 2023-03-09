module.exports = app => {
    const tablevalues = require("../controllers/tablevalues.controller.js");
    var router = require("express").Router();
    
    // Create a new tablevalue
    router.post("/", tablevalues.create);
  
    // Retrieve all tablevalue
    router.get("/", tablevalues.findAll);
 //group values
    router.get("/group/:id", tablevalues.findbyGroup);
  
    // Retrieve all published tablevalues
    router.get("/published", tablevalues.findAllPublished);
  
    // Retrieve a single Project with id
    router.get("/:id", tablevalues.findOne);
  
    // Update a tablevalue with id
    router.put("/:id", tablevalues.update);
  
    // Delete a tablevalue with id
    router.delete("/:id", tablevalues.delete);
  
    // Delete all tablevalues
    router.delete("/", tablevalues.deleteAll);
  
    app.use('/api/tablevalues', router);
  };