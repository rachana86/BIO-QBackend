const Step = require("../models/steps.model");


// Create and Save a new Step
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Step
  const step = new Step({
    sequenceNumber: req.body.sequenceNumber,
    description: req.body.description,
    testcaseId: req.body.testcaseId,
    expectedBehaviour: req.body.expectedBehaviour,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    createdBy: req.body.user
  });

  // Save step in the database
  Step.create(step, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the step."
      });
    else res.send(data);
  });
};

// Retrieve all Steps from the database.
exports.findAll = (req, res) => {
    const description = req.query.description;
    const testcaseId = req.query.testcaseId;
    console.log(req.query)
    Step.getAll(description, testcaseId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving steps."
        });
      else res.send(data);
    });
  
};

// Find a single Step with an id
exports.findOne = (req, res) => {
  const id = req.params['id'];
  Step.findById(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving steps."
      });
    else res.send(data);
  })
};

// Update a Step by the id in the request
exports.update = (req, res) => {
  const id = req.params['id'];
  Step.updateById(id, req.body, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating steps."
      });
    else res.send(data);
  })
};

// Delete a Step with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params['id'];
  Step.remove(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing steps."
      });
    else res.send(data);
  })
};

// Delete all Steps from the database.
exports.deleteAll = (req, res) => {
    const testcaseId = req.params['testcaseId'];
  Step.removeAll(testcaseId, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing steps."
      });
    else res.send(data);
  })
};
