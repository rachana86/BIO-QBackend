module.exports = app => {
    const steps = require("../controllers/steps.controller.js");
    var router = require("express").Router();
    
    // Create a new step
    router.post("/", steps.create);

    // Link a requirement to step
    router.post("/addRequirement", steps.addRequirement);

    // Retrieve all requirements attached to step
    router.get("/:id/requirements", steps.findReqByStepId);

    // Retrieve all requirements maps
    router.get("/requirements", steps.findReqByStepId);
  
    // Retrieve all step
    router.get("/", steps.findAll);
  
    // Retrieve a single step with id
    router.get("/:id", steps.findOne);
  
    // Update a step with id
    router.put("/:id", steps.update);
  
    // Delete a step with id
    router.delete("/:id", steps.delete);
  
    // Delete all steps
    router.delete("/", steps.deleteAll);
  
    app.use('/api/steps', router);
  };