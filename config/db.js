const mongoose = require('mongoose');


const db = () => {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("successfully connected to the database");

    }
    catch (err) {
        console.log("error connecting to the database", err);
    }
}
module.exports = db;