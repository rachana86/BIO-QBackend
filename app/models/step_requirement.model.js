
const sql = require("./db.js");

/*
CREATE TABLE IF NOT EXISTS `step_requirement` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  stepId int(11) NOT NULL,
  FOREIGN KEY (stepId) REFERENCES steps(id), 
  requirementId int(11) NOT NULL,
  FOREIGN KEY (requirementId) REFERENCES requirements(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME,
  createdBy varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const StepRequirement = function(step_requirement) {
    this.stepId = step_requirement.stepId;
    this.requirementId = step_requirement.requirementId;
    this.createdAt = step_requirement.createdAt;
    this.updatedAt = step_requirement.updatedAt;
    this.createdBy = step_requirement.createdBy;
  };

  StepRequirement.addRequirement = (stepRequirementMap, result) => {
    sql.query("INSERT INTO step_requirement SET ?", stepRequirementMap, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created step: ", { id: res.insertId, ...stepRequirementMap });
      result(null, { id: res.insertId, ...stepRequirementMap });
    });
  };

  StepRequirement.getAll = (stepId, requirementId, result) => {
    let query = "SELECT * FROM step_requirement";
  
    if (stepId) {
      query += ` WHERE stepId = ${stepId}`;
    }
    console.log(stepId)
    if (requirementId) {
      query += ` WHERE requirementId = ${requirementId}`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("step_requirement map: ", res);
      result(null, res);
    });
  };

  StepRequirement.remove = (stepId, result) => {
    sql.query("DELETE FROM step_requirement WHERE stepId = ?", stepId, (err, res) => {
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
  
      console.log("deleted step-requirement map with id: ", stepId);
      result(null, res);
    });
  };



  module.exports = StepRequirement;