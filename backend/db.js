const mongoose = require('mongoose');

// const mongoURI="mongodb://localhost:27017/jobportallatest?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoURI="mongodb://localhost:27017";
const mongoURI = 'mongodb+srv://narendra:1234@cluster0.t2iqymo.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log('Connected to Mongo Successfully');
  });
};

module.exports = connectToMongo;
