const sql = require("./db.js");

/*
  CREATE TABLE IF NOT EXISTS `testcases` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  precondition varchar(255) NOT NULL,
  description varchar(255),
  projectId int(11) NOT NULL,
  FOREIGN KEY (projectId) REFERENCES projects(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME, 
  createdBy varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const Testcase = function(testcase) {
  this.precondition = testcase.precondition;
  this.description = testcase.description;
  this.projectId = testcase.project_id;
  this.createdAt = testcase.createdAt;
  this.updatedAt = testcase.updatedAt;
  this.createdBy = testcase.createdBy;
};

Testcase.create = (newTestcase, result) => {
  sql.query("INSERT INTO testcases SET ?", newTestcase, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created testcase: ", { id: res.insertId, ...newTestcase });
    result(null, { id: res.insertId, ...newTestcase });
  });
};

Testcase.findById = (id, result) => {
  sql.query(`SELECT * FROM testcases WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found testcase: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found testcase with the id
    result({ kind: "not_found" }, null);
  });
};

Testcase.getAll = (description, project, result) => {
  let query = "SELECT * FROM testcases";

  if (description && project) {
    query += ` WHERE description LIKE '%${description}%' and projectId = ${project}`
  }

  else if (description) {
    query += ` WHERE description LIKE '%${description}%'`;
  }

  else if (project) {
    query += ` WHERE projectId = ${project}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("testcase: ", res);
    result(null, res);
  });
};


Testcase.updateById = (id, testcase, result) => {
  sql.query(
    "UPDATE testcases SET precondition = ?, description = ? WHERE id = ?",
    [testcase.precondition, testcase.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Testcase with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated testcase: ", { id: id, ...testcase });
      result(null, { id: id, ...testcase });
    }
  );
};

Testcase.remove = (id, result) => {
  sql.query("DELETE FROM testcases WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Testcase with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted testcase with id: ", id);
    result(null, res);
  });
};

Testcase.removeAll = (projectId, result) => {
  sql.query("DELETE FROM testcases where projectId = ?", projectId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} testcases`);
    result(null, res);
  });
};

module.exports = Testcase;