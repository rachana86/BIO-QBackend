const Project = require("../models/project.model.js");


// Create and Save a new Project
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Project
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  });

  // Save Project in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else res.send(data);
  });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;

    Project.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      else res.send(data);
    });
  
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Projects
exports.findAllPublished = (req, res) => {
  
};