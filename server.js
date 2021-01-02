const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// express configuration
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public'));

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
const db = new Pool(connectionParams);
db.connect();

// Import Routers
const programs = require('./src/routes/programs');

// API Router
app.use('/api', programs(db));


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
