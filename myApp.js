const express = require('express');
const app = express();
const helmet = require('helmet');
const seconds = 90 * 24 * 60 * 60;
// app.use(helmet.hidePoweredBy(),
//   helmet.frameguard({ action: 'deny' }),
//   helmet.xssFilter(),
//   helmet.noSniff(),
//   helmet.ieNoOpen(),
//   helmet.hsts({ maxAge: seconds, force: true }),
//   helmet.dnsPrefetchControl(),
//   helmet.noCache(),
//   helmet.contentSecurityPolicy({
//     directives:
//     {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'trusted-cdn.com']
//     }
//   })
// );
app.use(helmet({
  hsts: { maxAge: seconds, force: true },
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'trusted-cdn.com', 'style.com'],
    }
  },
  dnsPrefetchControl: false
}));



module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
