const sql = require("./db.js");

/*
  CREATE TABLE IF NOT EXISTS `requirements` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  projectId int(11) NOT NULL,
  FOREIGN KEY (projectId) REFERENCES projects(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME, 
  createdBy varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const Requirement = function(requirement) {
  this.title = requirement.title;
  this.description = requirement.description;
  this.projectId = requirement.project_id;
  this.createdAt = requirement.createdAt;
  this.updatedAt = requirement.updatedAt;
};

Requirement.create = (newRequirement, result) => {
  sql.query("INSERT INTO requirements SET ?", newRequirement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created requirement: ", { id: res.insertId, ...newRequirement });
    result(null, { id: res.insertId, ...newRequirement });
  });
};

Requirement.findById = (id, result) => {
  sql.query(`SELECT * FROM requirements WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found requirement: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found requirement with the id
    result({ kind: "not_found" }, null);
  });
};

Requirement.getAll = (title, result) => {
  let query = "SELECT * FROM requirements";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("requirement: ", res);
    result(null, res);
  });
};

Requirement.getAllPublished = result => {
  sql.query("SELECT * FROM requirements WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("requirements: ", res);
    result(null, res);
  });
};

Requirement.updateById = (id, requirement, result) => {
  sql.query(
    "UPDATE requirements SET title = ?, description = ? WHERE id = ?",
    [requirement.title, requirement.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Requirement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated requirement: ", { id: id, ...requirement });
      result(null, { id: id, ...requirement });
    }
  );
};

Requirement.remove = (id, result) => {
  sql.query("DELETE FROM requirements WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Requirement with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted requirement with id: ", id);
    result(null, res);
  });
};

Requirement.removeAll = result => {
  sql.query("DELETE FROM requirements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} requirements`);
    result(null, res);
  });
};

module.exports = Requirement;