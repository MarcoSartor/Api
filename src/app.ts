import express from 'express';
import config from './config'
import routes from './routes/index'
import cors from 'cors'
import morgan from 'morgan'

const app =  express();

app.set('port',config.PORT);

app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/user',routes.userRoutes)
app.use('/api/auth',routes.authRoutes)

export default app;