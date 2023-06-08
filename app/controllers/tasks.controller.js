const Task = require("../models/task.model");


// Create and Save a new Task
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body.createdBy);
  // Create a Task
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    projectId: req.body.projectId,
    assignee: req.body.assignee,
    status: req.body.status,
    priority: req.body.priority,
    taskType: req.body.taskType,
    createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    dueDate: req.body.dueDate,
    createdBy: req.body.createdBy
  });

  // Save task in the database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    else res.send(data);
  });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const assignee = req.query.assignee;
    const reporter = req.query.createdBy;
    Task.getAll(title, assignee, reporter, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      else res.send(data);
    });
  
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params['id'];
  Task.findById(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving testcases."
      });
    else res.send(data);
  })
};

// Find a single Task with an id
exports.getUsers = (req, res) => {
  Task.getAllUsers((err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  })
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params['id'];
  Task.updateById(id, req.body, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating tasks."
      });
    else res.send(data);
  })
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params['id'];
  Task.remove(id, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing tasks."
      });
    else res.send(data);
  })
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  const testcaseId = req.params['testcaseId'];
  Task.removeAll(testcaseId, (err, data)=> {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing tasks."
      });
    else res.send(data);
  })
};
