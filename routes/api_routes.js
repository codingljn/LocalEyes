const { User, savedVenues } = require('../models');
var db = require("../models");

module.exports = function (app) {

    app.get('/api/savedVenues', (req, res) => {
        db.savedVenues.findAll({
            where: {
                userId: req.user.id
            },
        }).then(savedVenues => {
            res.json(savedVenues);
        });
    });

    app.post("/api/savedVenues", function (req, res) {
        console.log(req);
        let body = req.body || {};
        let venueName = body.name
        if (!venueName) {
            return res.json({ error: 'empty body' })
        }
        db.savedVenues.create({
            name: venueName,
            category: body.category,
            tripName: body.tripName,
            address: body.address,
            city: body.city,
            userId: req.params.user.id
        }).then(function (dbsavedVenues) {
            res.json(dbsavedVenues);
        });
    });

    // Updating database
    app.put("/api/savedVenues", function (req, res) {
        db.savedVenues.update(req.body).then(function (dbsavedVenues) {
            res.json(dbsavedVenues);
        });
    });

    app.delete("/api/deleteVenue/:id", function (req, res) {
        db.savedVenues.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.json();
        });
    });

    // Get trips
    app.get('/api/savedVenues/tripNames', (req, res) => {
        db.savedVenues.findAll({
            attributes: ['tripName']
            // where: {
            //     id: 'userid'
            // }
        }).then(trips => {
            res.json(trips);
        });
    });

    app.get('/api/savedVenues/:category', (req, res) => {
        db.savedVenues.findAll({
            where: {
                category: req.params.category
            }
        }).then(venues => {
            res.json(venues);
        });
    });

    app.get('/api/savedVenuesTest/:tripName', (req, res) => {
        console.log(req.params.tripName);
        db.savedVenues.findAll({
            where: {
                tripName: req.params.tripName
            }
        }).then(venues => {
            console.log(venues);
            res.json(venues);
        });
    });
};