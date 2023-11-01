import mongoose from 'mongoose';
import config from './config';

(async () =>{
 try{
   const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,{
     // user: config.MONGO_USER,
     // pass: config.MONGO_PASSWORD
   });
    console.log('database is connected to: ', db.connection.name)
 }catch(err){
    console.log(err);
 }
})();

