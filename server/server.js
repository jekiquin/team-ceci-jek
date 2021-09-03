const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 6969;

app.use(cors())


app.listen(PORT, () => {
    console.log(`Port listening at http://localhost:${PORT}.`);
    console.log('Press ctrl+c(windows) or cmd+c(mac) to stop the server from running.');
})