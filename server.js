const ViteExpress = require("vite-express");

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Everything is cool http://localhost:${port}`)
});

ViteExpress.bind(app, server);
