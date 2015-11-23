var http = require('http')
var port = 1337
var ip = '127.0.0.1' //Ihre IP Adresse hier eintragen oder einfach 127.0.0.1
var url = require('url');

// Syntax changed, so that projects can be used as a JSON object
var projects = '{ "projects" : [' +
    '{ "title": "Erstiprojekt", "description" : "Das war mein erstes Projekt"},' +
    '{ "title": "Simulation", "description" : "System, Model und Simualtion"},' +
    '{ "title": "Freizeit Bastelei", "description" : "Solche Dinge mache ich in der Freizeit"} ]}';

// Parsing  projects to a JSON object
var projectsObj = JSON.parse(projects);


http.createServer(function (req, res) {
    
    // Getting a bunch of infos about the url
    var urlData = url.parse(req.url, true);
    // Getting the query-string out of the url
    // http://127.0.0.1:133?id=1 -> ?id=1 is the query
    var queryData = urlData.query;
    // for not getting an array out of bound error
    var hasEnded = false;
    
    // checking if the url is 127.0.0.1:1337/projects
    if(urlData.pathname === '/projects'){
        // checking if the query (?id=x) is higher than 2
        // if yes, give Array End, if not go into next if condition
        if(parseInt(queryData.id, 10) > 2) {
            res.end('Array End');
            hasEnded = true;
        }
        // checking the query Data and if the 'hasEnded' is false [if hasEnded would be true here, we would get an array out of bound error]
        if(parseInt(queryData.id, 10) === parseInt(queryData.id, 10) && hasEnded === false) {
            // Output: from the JSON obj we take the necessary information we need: parseInt(queryData.id) this is the x in ?id=x
            // So that when we type http://127.0.0.1/projects?id=0 -> we get the information about the first project in the projects object
            res.end('Titel: ' + projectsObj.projects[parseInt(queryData.id)].title + '\n Descritpion: ' + projectsObj.projects[parseInt(queryData.id)].description);
            hasEnded = false;
        }
        res.end('test');
    }
    
    // for not getting an error if you are on the index page: http://127.0.0.1/
    if(req.url === '/'){
        res.end('Home');
    }
    
}).listen(port, ip);


console.log('Server running at http://' + ip + ':' + port +'/');