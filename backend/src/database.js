const mongoose = require('mongoose');

module.exports = mongoose.connect("mongodb+srv://tindev:tindev@cluster0-ryy0l.mongodb.net/aircnc?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

