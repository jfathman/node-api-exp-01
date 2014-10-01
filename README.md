## docker-node-api ##

  Experimental source used for Docker container exploration.

  * REST API
  * Express 4
  * Microservices architecture

### Docker ###

Build Docker image:

    $ sudo docker build -t docker-node-api:0.1 .

Run bash in Docker container and then run Node app manually:

    $ sudo docker run -i -t --rm -p 8080:8080 -v `pwd`:/src docker-node-api:0.1
    $ node app.js

Run Node app from initial invocation of Docker container:

    $ sudo docker run -i -t --rm -p 8080:8080 -v `pwd`:/src docker-node-api:0.1 node app.js

Run multiple Node app Docker containers with unique port numbers:

    $ sudo docker run -i -t --rm -p 8085:8085 -e HTTP_PORT=8085 -v `pwd`:/src docker-node-api:0.1 node app.js
    $ sudo docker run -i -t --rm -p 8086:8086 -e HTTP_PORT=8086 -v `pwd`:/src docker-node-api:0.1 node app.js

Specify the Docker container names:

    $ sudo docker run -i -t --rm -p 8085:8085 -e HTTP_PORT=8085 --name api-01 -v `pwd`:/src docker-node-api:0.1 node app.js

    $ sudo docker run -i -t --rm -p 8086:8086 -e HTTP_PORT=8086 --name api-02 -v `pwd`:/src docker-node-api:0.1 node app.js

    $ sudo docker ps -a
    CONTAINER ID  IMAGE                COMMAND      CREATED         STATUS         PORTS                   NAMES
    67789a9491a2  docker-node-api:0.1  node app.js  42 seconds ago  Up 41 seconds  0.0.0.0:8085->8085/tcp  api-01
    fa606a968649  docker-node-api:0.1  node app.js  40 seconds ago  Up 40 seconds  0.0.0.0:8086->8086/tcp  api-02

### Test ###

    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X GET
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X PUT
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X POST
    $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X DELETE

### CI Test ###

    Temp force change to trigger CI.

### License ###

  MIT
