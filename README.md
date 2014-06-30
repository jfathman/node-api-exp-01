## Node.js REST API Experimental Source ##

### Description ###

Used for Docker container exploration.

* REST API
* Express 4
* Microservices architecture

### Docker ###

    $ sudo docker build -t docker-node-api:0.1 .
    $ sudo docker run -i -t --rm -p 8080:8080 -v `pwd`:/src docker-node-api:0.1
    $ node app.js

### Test ###

    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X GET
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X PUT
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X POST
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X DELETE

### Developer ###

* jfathman
