import {RequestHandler} from 'express'
import jwt from 'jsonwebtoken';

interface Payload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation: RequestHandler = (req, res, next) =>{
   const token =  req.header('auth-token');
   console.log('token',token);
   if(!token) return res.status(401).json('Access denied');
   
   const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as Payload;
   req.userId = payload._id

   next();
}