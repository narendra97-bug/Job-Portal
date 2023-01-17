const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const cors=require('cors');
app.use(cors());

const port = 5000

const bodyParser=require('body-parser');
app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
//use middleware for request.body
app.use(express.json());

//Available routes 
app.use('/api/auth',require('./routes/auth'));
app.use('/api/jobseeker', require('./routes/jobseeker'));
app.use('/api/jobprovider', require('./routes/jobprovider'));
app.use('/api/job/', require('./routes/job'));
app.use('/api/application/', require('./routes/application'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

