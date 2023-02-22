module.exports = app => {
    const testcases = require("../controllers/testcases.controller.js");
    var router = require("express").Router();
    
    // Create a new testcase
    router.post("/", testcases.create);
  
    // Retrieve all testcase
    router.get("/", testcases.findAll);
  
    // Retrieve a single testcase with id
    router.get("/:id", testcases.findOne);
  
    // Update a testcase with id
    router.put("/:id", testcases.update);
  
    // Delete a testcase with id
    router.delete("/:id", testcases.delete);
  
    // Delete all testcases
    router.delete("/", testcases.deleteAll);
  
    app.use('/api/testcases', router);
  };