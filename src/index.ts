import app from './app'
import './database'
import dotenv from 'dotenv';
dotenv.config()

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})