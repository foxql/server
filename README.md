# foxql-server
Basic websocket server for foxql-peer


## Documentation

### Install

```
npm i @foxql/foxql-server
```

### Run
```
npm run dev
```


#### Basic usage
``` javascript
const foxql = require('@foxql/foxql-server');

const server = new foxql.server(connection, [
    'https://foxql-bridge.herokuapp.com' // bridge server url
], '{YOUR_NODE_HOST}');

async function connection(socket)
{
    console.log('New Connection');
}


server.open();  
```


#### Change Configurations
``` javascript
const foxql = require('@foxql/foxql-server');

const server = new foxql.server();

server.use('serverOptions',{
    port : 3000,
    host : '0.0.0.0',
    protocol : 'http'
});

server.open();  
```

#### Custom socket listener
``` javascript
const foxql = require('@foxql/foxql-server');

const server = new foxql.server(connection);

server.open();  

async function connection(socket)
{
    console.log('user connected!');
}
```

#### Custom socket event listener by foxql module
create a 'hello-word.js' and put this codes.
``` javascript
const name = 'hello-word';

exports.listener = (socket, server, data) => {
    const id = socket.id;
    console.log(`Hello ${id}`);
    socket.emit('hello-world', `Your socketId is ${id}`);
}
exports.name = name;
```
and push your server! This example.

``` javascript
const foxql = require('../index.js');

const server = new foxql.server();

server.pushEvent(
    require('./hello-world.js')
);

server.open();  
```

