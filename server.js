var csv = require('csv');
var fs = require('fs');
var logule = require('logule').init(module);
var _ = require('underscore');
var numCPUs = require("os").cpus().length;
var os = require('os');

/*for (var i = 0; i < numCPUs; i++) {
    console.log(i);
}*/
console.log(os.cpus(), os.loadavg(), os.totalmem()/1000000000, os.freemem()/1000000000, os.type(), os.platform());
console.log("Bonjour %s, cette machine a %s CPUs", os.hostname(), numCPUs);

var source = process.argv[2];
var sortie = process.argv[3];

if (!source || !sortie) {
    console.log('syntax: %s %s <in.csv> <out.json>', process.argv[0], process.argv[1]);
    process.exit(1);
}

var compteur = 0;
csv()
    .from.path(source, { delimiter: ',', escape: '"' })
    .to.array(function (data) {
        var headers = data[0];
        logule.info('Creating JSON with attributes : %s', headers.join(' '));
        var res = [];
        for (var i = 1; i < data.length; ++i) {
            var line = data[i];
            var obj = {};
            _.each(line, function (value, index) { 
                var key = headers[index];
                if (value && value != 'NULL') {
                    obj[key] = value;
                } else {compteur++;}
             });
             res.push(obj);
        }
        fs.writeFileSync(sortie, JSON.stringify(res));
        logule.info('Operation complete, %s created successfully with %s errors', sortie, compteur);
    });