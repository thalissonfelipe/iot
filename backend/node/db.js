const mongoose = require('mongoose');

// TODO: add mongodb credentials later
const url ='mongodb+srv://iot:iot@cluster0.sbyep.mongodb.net/iot_db?retryWrites=true&w=majority';

(async function connectDB() {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    console.log('Connected with mongodb!');

    require('./subscriber');
})();
