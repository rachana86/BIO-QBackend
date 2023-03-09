const sql = require("./db.js");

/*
  CREATE TABLE IF NOT EXISTS `tablevalues` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  groupid varchar(255) NOT NULL,
  description varchar(255),
  projectId int(11) NOT NULL,
  FOREIGN KEY (projectId) REFERENCES projects(id), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME, 
  createdBy varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const Tablevalue = function(tablevalue) {
  this.groupid = tablevalue.groupid;
  this.description = tablevalue.description;
  this.option = tablevalue.option;
  this.createdAt = tablevalue.createdAt;
  this.updatedAt = tablevalue.updatedAt;
  this.createdBy = tablevalue.createdBy;
};

Tablevalue.create = (newTablevalue, result) => {
  sql.query("INSERT INTO tablevalues SET ?", newTablevalue, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tablevalue: ", { id: res.insertId, ...newTablevalue });
    result(null, { id: res.insertId, ...newTablevalue });
  });
};

Tablevalue.findById = (id, result) => {
  sql.query(`SELECT * FROM tablevalues WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tablevalue: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tablevalue with the id
    result({ kind: "not_found" }, null);
  });
};

Tablevalue.getAll = (description, result) => {
  let query = "SELECT * FROM tablevalues";

  if (description) {
    query += ` WHERE description LIKE '%${description}%'`;
  }

   

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tablevalue: ", res);
    result(null, res);
  });
};

Tablevalue.findbyGroup = (groupid, result) => {
    let query = "SELECT * FROM tablevalues";
  
    if (groupid) {
      query += ` WHERE groupid = '${groupid}'`;
    }
  
     
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tablevalue: ", res);
      result(null, res);
    });
  };


Tablevalue.updateById = (id, tablevalue, result) => {
  sql.query(
    "UPDATE tablevalues SET groupid = ?, option = ?, description = ? WHERE id = ?",
    [tablevalue.groupid,tablevalue.option, tablevalue.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tablevalue with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tablevalue: ", { id: id, ...tablevalue });
      result(null, { id: id, ...tablevalue });
    }
  );
};

Tablevalue.remove = (id, result) => {
  sql.query("DELETE FROM tablevalues WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tablevalue with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tablevalue with id: ", id);
    result(null, res);
  });
};

Tablevalue.removeAll = ( result) => {
  sql.query("DELETE FROM tablevalues  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tablevalues`);
    result(null, res);
  });
};

module.exports = Tablevalue;