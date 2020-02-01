var mongoose = require("mongoose");
var connectionString = "mongodb+srv://Tim5tim:codemonkey@timcluster-juwiw.mongodb.net/test?retryWrites=true&w=majority";
var connection = mongoose.connection;

mongoose.connect(connectionString);

connection.on("error", err => {
  console.error("mlab Error: ", err);
});

connection.once("open", () => {
  console.log("connected to MLAB");
});