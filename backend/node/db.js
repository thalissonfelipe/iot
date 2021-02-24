const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/iot_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, err => {
    if (!err) console.log('Connected with mongodb!');
    else console.log(err);
});
