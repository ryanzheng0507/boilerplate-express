let express = require('express');
let app = express();

console.log("Hello World")

// In Express, routes takes the following structure:
// app.METHOD(PATH, HANDLER).
// METHOD is an http method in lowercase.
// PATH is a relative path on the server(it can be a string, or even a regular expression).
// HANDLER is a function that Express calls when the route is matched.
// Handlers take the form function(req, res) {...}, where req is the request object, and res is the response object.
// Use the app.get() method to serve the string "Hello Express" to GET requests matching the /(root) path.
app.get('/', (req, res) => {
  res.send('Hello Express')
})




































 module.exports = app;
