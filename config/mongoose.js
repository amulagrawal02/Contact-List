const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));

db.once('open',function()
{
    console.log("Successfully connect to the database");
})