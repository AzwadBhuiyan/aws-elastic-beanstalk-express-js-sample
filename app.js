var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Export app instance for automated testing
module.exports = app;

if (require.main === module) {
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
