const sql = require("./db.js");

/*
  CREATE TABLE IF NOT EXISTS `user_activity` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(11) NOT NULL,
  actionId int(11) NOT NULL,
  createdAt DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// constructor
const UserActivity = function(user_activity) {
  this.userId = user_activity.userId;
  this.actionId = user_activity.actionId;
  this.createdAt = user_activity.createdAt;
};


UserActivity.create = (newUserActivity, result) => {
  sql.query("INSERT INTO user_activity SET ?", newUserActivity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user_activity: ", { id: res.insertId, ...newUserActivity });
    result(null, { id: res.insertId, ...newUserActivity });
  });
};

UserActivity.findById = (id, result) => {
  sql.query(`SELECT * FROM user_activity WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user_activity: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserActivity with the id
    result({ kind: "not_found" }, null);
  });
};

UserActivity.getAll = (title, result) => {
  let query = "SELECT * FROM user_activity";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_activity: ", res);
    result(null, res);
  });
};

UserActivity.remove = (id, result) => {
  sql.query("DELETE FROM user_activity WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UserActivity with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user_activity with id: ", id);
    result(null, res);
  });
};

UserActivity.removeAll = result => {
  sql.query("DELETE FROM user_activity", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user_activity`);
    result(null, res);
  });
};

module.exports = UserActivity;