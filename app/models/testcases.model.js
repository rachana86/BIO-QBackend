module.exports = (sequelize, Sequelize) => {
    const Testcases = sequelize.define("testcases", {
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
  
    return Testcases;
  };