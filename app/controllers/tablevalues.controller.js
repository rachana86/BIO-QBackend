const Tablevalue = require("../models/tablevalue.model");


// Create and Save a new Tablevalue
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Tablevalue
  const tablevalue = new Tablevalue({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    createdUser: req.body.createdUser,
    updatedUser: req.body.updatedUser,
    riskimpact: req.body.riskimpact,
    gampcat: req.body.gampcat,
    riskrating: req.body.riskrating,
    testtype: req.body.testtype
  });

  // Save Tablevalue in the database
  Tablevalue.create(tablevalue, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tablevalue."
      });
    else res.send(data);
  });
};

// Retrieve all Tablevalues from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;

    Tablevalue.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tablevalues."
        });
      else res.send(data);
    });
  
};

// Find a single Tablevalue with an id
exports.findOne = (req, res) => {
  const id = req.params['id'];
  Tablevalue.findById(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tablevalues."
      });
    else res.send(data);
  })
};

// Update a Tablevalue by the id in the request
exports.update = (req, res) => {
  const id = req.params['id'];
  Tablevalue.updateById(id, req.body, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating tablevalues."
      });
    else res.send(data);
  })
};

// Delete a Tablevalue with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params['id'];
  Tablevalue.remove(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing tablevalues."
      });
    else res.send(data);
  })
};

// Delete all Tablevalues from the database.
exports.deleteAll = (req, res) => {
  Tablevalue.removeAll((err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing tablevalues."
      });
    else res.send(data);
  })
};

// Find all published Tablevalues
exports.findAllPublished = (req, res) => {
  
};