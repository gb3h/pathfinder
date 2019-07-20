/*global path, err*/
/*jslint node:true */
/*jslint nomen: true */

var port = '8002';
var express = require('express');
var app = express();
var ejs = require('./download-pdf/ejs');
var pdf = require('./download-pdf/pdf');

// app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.set("view engine", "ejs");

//For parsing json files
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

//Start Mongoose connection to db called pf_users
var mongoose = require('mongoose');

/*
Standard format: mongoose.connect('mongodb://username:password@host:port/database')
Other format: mongoose.connect('mongodb://host:port/database');
*/
// mongoose.connect("mongodb://localhost:27017/pf_users", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://phoebe:pfpassword@cluster0-pbd6q.mongodb.net/pf_users", {
    useNewUrlParser: true
});

// Create Route Schema for stored route data
var openingHoursSchema = new mongoose.Schema({
    weekday_text: [String]
    // open_now: {type: Boolean, default: true}
});

// Create Place Schema for stored route data
var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    place_id: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: null
    },
    opening_hours: openingHoursSchema
});

// Create User Schema for stored user data
var userSchema = new mongoose.Schema({
    name: String,
    id: Number,
    email: String
});

// Create Route Schema for stored route data
var routeSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    route: {
        type: [locationSchema],
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Create collections named users and routes
var User = mongoose.model("User", userSchema);
var Route = mongoose.model("Route", routeSchema);
var user = "";

// Save user to mongodb, check if already registered first
app.post('/save-user', function (req) {
    "use strict";
    console.log("Logged in as " + req.body.email);
    user = new User({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email
    });

    // Check if user has been registered before
    User.find({
        email: req.body.email
    }, function (err, user_found) {
        if (err) {
            console.log(err);
        } else if (user_found.length === 0) {
            console.log("Registering new user " + req.body.name + "...");
            user.save();
        } else {
            console.log("This user has already been registered. This is his/her record.");
            console.log(user_found);
        }
    });
});

// Save path to mongodb, check for existing identical paths first
app.post('/save-path', function (req, res) {
    "use strict";
    // console.log(req.body);
    var route = new Route({
        user_email: user.email,
        route: req.body.locations
    });
    Route.find({
        user_email: user.email
    }, function (err, routes_found) {
        if (err) {
            console.log(err);

            // No routes saved before, save first ever route
        } else if (routes_found.length === 0) {
            console.log("Saving first ever route..." + route);
            route.save();

            // Check for identical existing paths
        } else if (routes_found.length > 0) {
            var savedBefore = false,
                savedRecord;
            routes_found.forEach(function (route) {
                if (JSON.stringify(route.route, ["name"]) === JSON.stringify(req.body.locations, ["name"])) {
                    savedBefore = true;
                    savedRecord = route;
                }
            });
            // Path has been saved before
            if (savedBefore) {
                console.log("This route has already been saved before. Record is as below");
                console.log(savedRecord);
            } else {
                // Path has not been saved before
                console.log("Not saved before");

                // Check if locations are defined
                if (req.body.locations !== undefined) {
                    console.log("Saving the route which contains the following locations... ");
                    req.body.locations.forEach(function (location) {
                        if (location) {
                            console.log(location.name);
                        }
                    });
                    console.log(route);
                    route.save();
                } else {
                    console.log("No locations entered");
                }
            }
        } else {
            console.log("Error: Locations undefined. No locations have been entered");
        }
    });
    res.redirect('/');
});

// Find path by its _id to delete it
app.post('/delete-path', function (req) {
    "use strict";
    Route.deleteOne({
        _id: req.body._id
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted route with id " + req.body._id);
        }
    });
});

// Find path by its _id to update it
app.post('/update-path', function (req) {
    "use strict";
    Route.updateOne({
        _id: req.body._id
    }, {
        route: req.body.locations
    }, function (err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log(resp);
        }
    });
});

// Find all paths saved by the user
app.get('/paths', function (resp, res) {
    "use strict";
    // console.log(resp);
    if (user.email !== undefined) {
        Route.find({
            user_email: user.email
        }, function (err, all_routes) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(all_routes));
            }
        });
    } else {
        console.log("No email");
        res.redirect("/");
    }
});

app.post('/download-path', function (req, res) {
    "use strict";
    var locations = req.body.selected;
    locations = JSON.parse(locations);
    console.log(locations);
    // var coords = shortestRoute(names);
    // var data1 = getShortest(coords, names);
    // console.log(data1);
    res.render('pdf.ejs', {
        obj: locations,
        tagline: "Optimal path for the destinations is as follows"
    });
    ejs.toHTML('views/pdf.ejs', {
        obj: locations,
        tagline: "Optimal path for the destinations is as follows"
    }).then(function (html) {
        var options = {
                format: 'A4',
                margin: '2cm'
            },
            output = 'pdf_dryrun2.pdf';
        // var output = 'pdf_' + moment().format('YYYYMMDDHHmmSS') + '.pdf'

        pdf.toPDF(html, options, output).then(function (response) {
            console.log("PDF file successfully written");
            console.log(response);
        }, function (error) {
            console.error(error);
        });
    }, function (error) {
        console.error(error);
    });
});

app.listen(process.env.PORT || 8002);
console.log('Working...');