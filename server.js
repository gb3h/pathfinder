var port = '8002';
var express = require('express');
var app = express();

app.use(express.static(__dirname));

//For parsing json files
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Start Mongoose connection to db called pf_users
var mongoose = require('mongoose');

/*
Standard format: mongoose.connect('mongodb://username:password@host:port/database')
Other format: mongoose.connect('mongodb://host:port/database');
*/
// mongoose.connect("mongodb://localhost:27017/pf_users", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://phoebe:pfpassword@cluster0-pbd6q.mongodb.net/pf_users", {useNewUrlParser: true});

// Create Place Schema for stored route data
var locationSchema = new mongoose.Schema({
  name: String,
  place_id: String
});

// Create User Schema for stored user data
var userSchema = new mongoose.Schema({
  name: String,
  id: Number,
  email: String
});

// Create Route Schema for stored route data
var routeSchema = new mongoose.Schema({
  user_email: {type: String, required: true},
  route: {type : [locationSchema], required: true},
  created_at: { type: Date, required: true, default: Date.now }
});

// Create collections named users and routes
var User = mongoose.model("User", userSchema);
var Route = mongoose.model("Route", routeSchema);
var user = "";

// Save user to mongodb, check if already registered first
app.post('/save-user', function(req, res) {
  console.log("Logged in as " + req.body.email);
  user = new User({
    name: req.body.name,
    id: req.body.id,
    email: req.body.email
  });
  User.find({email: req.body.email}, function(err, user_found){
    if (err) {
      console.log(err);
    } else if (user_found.length == 0){
      console.log("Registering new user " + req.body.name + "...");
      user.save();
    } else {
      console.log("This user has already been registered. This is his/her record.");
      console.log(user_found);
    }
  });
});


app.post('/save-path', function(req, res){
  console.log(req.body);
  var route = new Route({
    user_email: user.email,
    route: req.body.locations
  });
  Route.find({user_email: user.email}, function(err, routes_found){
    if (err) {
      console.log(err);
    } else if (routes_found.length == 0){
      console.log("Saving first ever route...");
      console.log(route);
      route.save();
    } else if (routes_found.length > 0){
      console.log(routes_found.length);
        var savedBefore = false;
        var savedRecord;
        routes_found.forEach(function(route){
          if (JSON.stringify(route.route, ["name"]) == JSON.stringify(req.body.locations, ["name"])) {
            savedBefore = true;
            savedRecord = route;
          }
        });
        if (savedBefore) {
            console.log("This route has already been saved before. Record is as below");
            console.log(savedRecord);
        } else {
            console.log("Not saved before");
            if (req.body.locations != undefined){
              console.log("Saving the route which contains the following locations... ");
              req.body.locations.forEach(function(location) {
                if (location) {
                  console.log(location.name);
                }
              });
              console.log(route);
              route.save();
            } else {}
        }
    } else {
      console.log("Error: Locations undefined. No locations have been entered");
    }
  });
  res.redirect('/');
});

app.post('/delete-path', function(req, res) {
    Route.deleteOne({_id: req.body._id}, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted route with id " + req.body._id);
      }
    });
});

app.post('/update-path', function(req, res) {
    Route.updateOne({_id: req.body._id}, {
      route: req.body.locations
    }, function(err, affected, resp){
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    });
});

app.get('/paths', function(req, res) {
  if (user.email != undefined) {
    Route.find({user_email: user.email}, function(err, all_routes){
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

app.listen(port);
console.log('Working on ' +port);
