const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

(async function connectDB() {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('Connected with mongodb!');

    require('./subscriber');
})();
