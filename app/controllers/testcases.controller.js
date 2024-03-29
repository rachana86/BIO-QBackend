const Testcase = require("../models/testcases.model");


// Create and Save a new Testcase
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Testcase
  const testcase = new Testcase({
    precondition: req.body.preconditions,
    description: req.body.description,
    project_id: req.body.projectId,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    createdBy: req.body.user
  });

  // Save testcase in the database
  Testcase.create(testcase, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the testcase."
      });
    else res.send(data);
  });
};

// Retrieve all Testcases from the database.
exports.findAll = (req, res) => {
    const description = req.query.description;
    const project = req.query.project;

    Testcase.getAll(description, project, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving testcases."
        });
      else res.send(data);
    });
  
};

// Find a single Testcase with an id
exports.findOne = (req, res) => {
  const id = req.params['id'];
  Testcase.findById(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving testcases."
      });
    else res.send(data);
  })
};

// Update a Testcase by the id in the request
exports.update = (req, res) => {
  const id = req.params['id'];
  Testcase.updateById(id, req.body, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating testcases."
      });
    else res.send(data);
  })
};

// Delete a Testcase with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params['id'];
  Testcase.remove(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing testcases."
      });
    else res.send(data);
  })
};

// Delete all Testcases from the database.
exports.deleteAll = (req, res) => {
    const projectId = req.params['project'];
  Testcase.removeAll(projectId, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing testcases."
      });
    else res.send(data);
  })
};
