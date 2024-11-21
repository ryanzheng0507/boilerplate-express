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

// You can respond to requests with a file using the res.sendFile(path) method.
// You can put it inside the app.get('/', ...) route handler.
// Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handler the file you want to send,
// according to its type.
// Then it will read and send the file.
// This method needs an absolute file path.
// We recommend you to use the Node global variable __dirname to calculate the path like this:
// absolutePath = __dirname + '/relativePath/file.ext'
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// An HTML server usually has one or more directories that are accessible by the user.
// You can place there the static assets needed by your application(stylesheets, scripts, images).
// In Express, you can put in place this functionality using the middleware express.static(path),
// where the path parameter is the absolute path of the folder containing the assets.
// Basically, middleware are functions that intercept route handlers,
// adding some kind of information.
// A middleware needs to be mounted using the method app.use(path, middlewareFunction).
// The first path argument is optional.
// If you don't pass it, the middleware will be executed for all requests.
// The absolute path to the assets folder is __dirname + /public.
app.use('/public', express.static(__dirname + '/public'))

// While an HTML server serves HTML, an API serves data.
// A REST(REpresentational State Transfer) API allows data exchange in a simple way,
// without the need for clients to know any detail about the server.
// The client only needs to know where the resource is(the URL),
// and the action it wants to perform on it(the verb).
// The GET verb is used when you are fetching some information, without modifying anything.
// These days, the preferred data format for moving information around the web is JSON.
// Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted.
// Let's create a simple API by creating a route that responds with JSON at the path /json.
// You can do it as usual, with the app.get() method.
// Inside the route handler, use the method res.json(), passing in an object as an argument.
// This method closes the request-response loop, returning the data.
// Behind the scenes, it converts a vlid JavaScript object into a string,
// then sets the appropriate headers to tell your browser that you are serving JSON,
// and sends the data back.
// A valid object ahs the usual structure {key: data}.
// data can be a number, a string, a nested object or an array.
// data can also be a variable or the result off a function call,
// in which case it will be evaluated before being converted into a string.
app.get('/json', (req, res) => {
  res.json({"message": "Hello json"})
})




































 module.exports = app;
