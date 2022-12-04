module.exports = (sequelize, Sequelize) => {
    const Reqmnts = sequelize.define("reqmnts", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Reqmnts;
  };