const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
  }
});

// PG database client / connection setup
const { Pool } = require("pg");
const dbParams = require("./knexfile.js");
const environment = process.env.ENVIRONMENT || "development";
let connectionParams;
if (environment === "production") {
  connectionParams = {
    connectionString: dbParams.production.connection,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  connectionParams = dbParams.development.connection;
}

// Database connection
const db = new Pool(connectionParams);
// const { manageSocket } = require('./src/socket')(db);
db.connect();

// Import helper functions
const messageHelpers = require('./src/helpers/messages')(db);
const courseHelpers = require('./src/helpers/courses')(db);

// Socket manager
const { manageSocket } = require('./src/socket')(db);

// Socket events managed in a separate module
io.on('connection', socket => {
  manageSocket(db, socket, io);
})

//Logger
app.use(morgan('dev'));
// express configuration
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public'));

// Import Routers
const users = require('./src/routes/users');
const privateRoom = require('./src/routes/privateRoom');
const programs = require('./src/routes/programs');
const courses = require('./src/routes/courses')(courseHelpers);
const messages = require('./src/routes/messages')(messageHelpers);

// API Router
app.use('/api', programs(db));
app.use('/api', users(db));
app.use('/api', courses);
app.use('/api', messages);
app.use('/api', privateRoom(db));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
