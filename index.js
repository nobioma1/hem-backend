require('dotenv').config();
const debug = require('debug')('app');
const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => debug(`Server Live on PORT ${PORT}`));
