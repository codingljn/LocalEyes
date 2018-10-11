'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('savedVenues', {
            id: {
                type: Sequelize.INTEGER,
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('savedVenues');
    }
};