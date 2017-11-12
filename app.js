const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config.js');
const base58 = require('./base58.js');
const Url = require('./models/url.js');

var app = express();
mongoose.connect('mongodb://' +  config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, 'public')));

//serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

//return shortened url
app.post('/api/shorten', (req, res) => {
    var longUrl = req.body.url;
    var shortUrl = '';

    Url.findOne({long_url: longUrl}, (err, doc) => {
        if(doc){
            shortUrl = config.webhost + base58.encode(doc._id);
            res.send({'shortUrl': shortUrl});
        } else {
            var newUrl = Url({
                long_url: longUrl
            });

            newUrl.save( (err) => {
                if(err) {
                    console.log(err);
                }

                shortUrl = config.webhost + base58.encode(newUrl._id);

                res.send({'shortUrl' : shortUrl});
            });
        }
    });
});

app.get('/:encodedId', (req, res) => {

});

var server = app.listen(3000, () => {
    console.log('Server listening on port 3000');
})