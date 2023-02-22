const sql = require("./db.js");

/*
  CREATE TABLE IF NOT EXISTS `steps` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sequenceNumber int(11) NOT NULL,
  description varchar(255) NOT NULL,
  expectedBehaviour varchar(255),
  testcaseId int(11) NOT NULL,
  FOREIGN KEY (testcaseId) REFERENCES testcases(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME, 
  createdBy varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const Step = function(step) {
  this.sequenceNumber = step.sequenceNumber;
  this.description = step.description;
  this.expectedBehaviour = step.expectedBehaviour;
  this.testcaseId = step.testcaseId;
  this.createdAt = step.createdAt;
  this.updatedAt = step.updatedAt;
  this.createdBy = step.createdBy;
};

Step.create = (newStep, result) => {
  sql.query("INSERT INTO steps SET ?", newStep, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created step: ", { id: res.insertId, ...newStep });
    result(null, { id: res.insertId, ...newStep });
  });
};

Step.findById = (id, result) => {
  sql.query(`SELECT * FROM steps WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found step: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found step with the id
    result({ kind: "not_found" }, null);
  });
};

Step.getAll = (description, testcaseId, result) => {
  let query = "SELECT * FROM steps";

  if (description) {
    query += ` WHERE description LIKE '%${description}%'`;
  }
  console.log(testcaseId)
  if (testcaseId) {
    query += ` WHERE testcaseId = ${testcaseId} order by sequenceNumber`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("step: ", res);
    result(null, res);
  });
};


Step.updateById = (id, step, result) => {
  sql.query(
    "UPDATE steps SET expectedBehaviour = ?, description = ? WHERE id = ?",
    [step.expectedBehaviour, step.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Step with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated step: ", { id: id, ...step });
      result(null, { id: id, ...step });
    }
  );
};

Step.remove = (id, result) => {
  sql.query("DELETE FROM steps WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Step with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted step with id: ", id);
    result(null, res);
  });
};

Step.removeAll = (testcaseId, result) => {
  sql.query("DELETE FROM steps WHERE testcaseId = ?", testcaseId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} steps`);
    result(null, res);
  });
};

module.exports = Step;