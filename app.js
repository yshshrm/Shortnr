const express = require('express');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

//return shortened url
app.post('/api/shorten', (req, res) => {

});

app.get('/:encodedId', (req, res) => {

});

var server = app.listen(3000, () => {
    console.log('Server listening on port 3000');
})