let express = require('express');
let app = express();
require('dotenv').config()

// Earlier, you were introduced to the express.static() middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().
// Look at the following example:
// function(req, res, next) {
//   console.log("I'm a middleware...");
//   next();
// }
// Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack. In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the app.use(<mware-function>) method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use app.post(<mware-function>). Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).
// Build a simple logger. For every request, it should log to the console a string taking the following format: method path - ip. An example would look like this: GET /json - ::ffff:127.0.0.1. Note that there is a space between method and path and that the dash separating path and ip is surrounded by a space on both sides. You can get the request method (http verb), the relative route path, and the caller’s ip from the request object using req.method, req.path and req.ip. Remember to call next() when you are done, or your server will be stuck forever. Be sure to have the ‘Logs’ opened, and see what happens when some request arrives.
// This should be right after defining let app = express()
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
})

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

// Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction). Middleware can also be chained within a route definition.
// Look at the following example:
// app.get('/user', function(req, res, next) {
//   req.user = getTheUserSync();  // Hypothetical synchronous operation
//   next();
// }, function(req, res) {
//   res.send(req.user);
// });
// This approach is useful to split the server operations into smaller units. That leads to a better app structure, and the possibility to reuse code in different places. This approach can also be used to perform some validation on the data. At each point of the middleware stack you can block the execution of the current chain and pass control to functions specifically designed to handle errors. Or you can pass control to the next matching route, to handle special cases. We will see how in the advanced Express section.
// In the route app.get('/now', ...) chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the req.time key. You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
})

// When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the req.params object.
// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
// Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})




































 module.exports = app;
