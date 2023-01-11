const Requirement = require("../models/requirements.model");


// Create and Save a new Requirement
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Requirement
  const requirement = new Requirement({
    title: req.body.title,
    description: req.body.description,
    project_id: req.body.projectId,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  });

  // Save requirement in the database
  Requirement.create(requirement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the requirement."
      });
    else res.send(data);
  });
};

// Retrieve all Requirements from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;

    Requirement.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving requirements."
        });
      else res.send(data);
    });
  
};

// Find a single Requirement with an id
exports.findOne = (req, res) => {
  const id = req.params['id'];
  Requirement.findById(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving requirements."
      });
    else res.send(data);
  })
};

// Update a Requirement by the id in the request
exports.update = (req, res) => {
  const id = req.params['id'];
  Requirement.updateById(id, req.body, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating requirements."
      });
    else res.send(data);
  })
};

// Delete a Requirement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params['id'];
  Requirement.remove(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing requirements."
      });
    else res.send(data);
  })
};

// Delete all Requirements from the database.
exports.deleteAll = (req, res) => {
  Requirement.removeAll((err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing requirements."
      });
    else res.send(data);
  })
};

// Find all published Requirements
exports.findAllPublished = (req, res) => {
  
};