module.exports = function (sequelize, Datatypes) {
  var savedVenues = sequelize.define("savedVenues", {
      id: {
          type: Datatypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type: Datatypes.STRING,
      },
      category: {
          type: Datatypes.STRING,
      },
      address: {
          type: Datatypes.STRING,
      },
      city: {
          type: Datatypes.STRING,
      }, 
      tripName: {
          type: Datatypes.STRING,
      }
  }, {});

  savedVenues.associate = function (models) {
      savedVenues.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
              alllowNull: false
          }
      });
  };
  return savedVenues;
};