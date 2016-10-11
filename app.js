let express = require('express');
let app = express();
let path = require('path');
let port = 8080;

app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
    console.log('client listening on', port);
});