
const sql = require("./db.js");
/*
  CREATE TABLE IF NOT EXISTS `tasks` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  projectId int(11) NOT NULL,
  assignee int(11),
  status varchar(255),
  priority varchar(255),
  taskType varchar(255),
  FOREIGN KEY (projectId) REFERENCES projects(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME,
  dueDate DATETIME,
  createdBy int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const Task = function(task) {
    this.title = task.title;
    this.description = task.description;
    this.projectId = task.projectId;
    this.assignee = task.assignee;
    this.status = task.status;
    this.priority = task.priority;
    this.taskType = task.taskType;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.dueDate = task.dueDate;
    this.createdBy = task.createdBy;
  };
  
  
  Task.create = (newTask, result) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created task: ", { id: res.insertId, ...newTask });
      result(null, { id: res.insertId, ...newTask });
    });
  };
  
  Task.findById = (id, result) => {
    sql.query(`SELECT * FROM tasks WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found task: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Task with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Task.getAll = (title, assignee, reporter, result) => {
    let query = "SELECT * FROM tasks";
    counter = 0

    if (title){
        query += ` WHERE title LIKE '%${title}%' `;
        counter += 1;
    }

    if (assignee){
        if (counter == 0){
            query += " WHERE "
        } else {
            query += " AND "
        }
        query += `  assignee = '${assignee}'`;
        counter += 1;
    }

    if (reporter){
        if (counter == 0){
            query += " WHERE "
        } else {
            query += " AND "
        }
        query += ` createdBy = '${reporter}'`;
    }

  
    console.log(query)
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("task: ", res);
      result(null, res);
    });
  };

  Task.getAllUsers = (result) => {
    sql.query("SELECT id, username from users", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("found users: ", res);
        result(null, res);
      });
  };
  
  Task.updateById = (id, task, result) => {
    sql.query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, assignee = ?, priority = ?, taskType = ?, dueDate = ? WHERE id = ?",
      [task.title, task.description, task.status, task.assignee, task.priority, task.taskType, task.dueDate, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Task with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated task: ", { id: id, ...task });
        result(null, { id: id, ...task });
      }
    );
  };
  
  Task.remove = (id, result) => {
    sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted task with id: ", id);
      result(null, res);
    });
  };
  
  Task.removeAll = result => {
    sql.query("DELETE FROM tasks", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} tasks`);
      result(null, res);
    });
  };
  
  module.exports = Task;