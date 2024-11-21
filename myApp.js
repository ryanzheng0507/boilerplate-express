let express = require('express');
let app = express();
require('dotenv').config()

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

// The .env file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.
// The environment variables are accessible from the app as process.env.VAR_NAME. The process.env object is a global Node object, and variables are passed as strings. By convention, the variable names are all uppercase, with words separated by an underscore. The .env is a shell file, so you don’t need to wrap names or values in quotes. It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. VAR_NAME=value. Usually, you will put each variable definition on a separate line.
// Let's add an environment variable as a configuration option.
// Create a .env file in the root of your project directory, and store the variable MESSAGE_STYLE=uppercase in it.
// Then, in the /json GET route handler you created in the last challenge access process.env.MESSAGE_STYLE and transform the response object's message to uppercase if the variable equals uppercase. The response object should either be {"message": "Hello json"} or {"message": "HELLO JSON"}, depending on the MESSAGE_STYLE value. Note that you must read the value of process.env.MESSAGE_STYLE inside the route handler, not outside of it, due to the way our tests run.
// You will need to use the dotenv package. It loads environment variables from your .env file into process.env. The dotenv package has already been installed, and is in your project's package.json file. At the top of your myApp.js file, add require('dotenv').config() to load the environment variables.

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({"message": "Hello json".toUpperCase()})
  } else {
    res.json({"message": "Hello json"})
  }
})




































 module.exports = app;
