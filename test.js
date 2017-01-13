var numCPUs = require("os").cpus().length;
var os = require('os');

for (var i = 0; i < numCPUs; i++) {
    console.log(i);
}

console.log(os.hostname());