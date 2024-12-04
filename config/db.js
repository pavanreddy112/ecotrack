const mongoose = require('mongoose');
const { connect } = require('../routes/userRoutes');


//database connection

const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ecotrack');
        console.log(`Connected to Database ${conn.connection.host}`)
    }catch(error){
        console.log(`Mongodb error: ${error.message}`);
            process.exit(1);
    }
};
module.exports= connectDb
    