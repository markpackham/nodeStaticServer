// Learning to build a static server from https://www.youtube.com/watch?v=Moy6QIpp7Zw
// Just do "node server" to run
const static = require("node-static");
const port = 8080;
const file = new static.Server("./public");

require("http")
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        file.serve(request, response, function (e, res) {
          if (e && e.status === 404) {
            file.serveFile("/error.html", 404, {}, request, response);
          }
        });
      })
      .resume();
  })
  .listen(port, function () {
    console.log(`Server started on port ${port}`);
  });
