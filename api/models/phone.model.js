module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // DEFINE YOUR MODEL HERE
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Phone;
};
