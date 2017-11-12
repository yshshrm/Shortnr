var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = Schema({
    _id: {
        type: Number,
        index: true
    },
    long_url: String,
    created_at: Date
});

urlSchema.pre('save', (next) => {
    var doc = this;

    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1 }}, (error, counter) => {
        if(error){
            return next(error);
        }
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
    });
});

var Url = mongoose.model('url', urlSchema);

module.exports = Url;