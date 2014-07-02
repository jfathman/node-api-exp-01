## docker-node-api ##

  Experimental source used for Docker container exploration.

  * REST API
  * Express 4
  * Microservices architecture

### Docker ###

Build:

    $ sudo docker build -t docker-node-api:0.1 .

Run app from bash shell:

    $ sudo docker run -i -t --rm -p 8080:8080 -v `pwd`:/src docker-node-api:0.1
    $ node app.js

Run app from invocation:

    $ sudo docker run -i -t --rm -p 8080:8080 -v `pwd`:/src docker-node-api:0.1 node app.js

Run multiple app containers with unique port numbers:

    $ sudo docker run -i -t --rm -p 8085:8085 -e HTTP_PORT=8085 -v `pwd`:/src docker-node-api:0.1 node app.js
    $ sudo docker run -i -t --rm -p 8086:8086 -e HTTP_PORT=8086 -v `pwd`:/src docker-node-api:0.1 node app.js

### Test ###

    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X GET
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X PUT
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X POST
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X DELETE

### License ###

  MIT
